// ================================================================
// AUTHENTICATION ROUTE INTEGRATION TESTS
// ================================================================

require('../setup');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const { expect } = chai;
const { initTestDatabase, cleanDatabase, closeTestDatabase, getTestPool } = require('../helpers/database');

chai.use(chaiHttp);

// Import app after environment is configured
const app = require('../../server');

describe('Authentication Routes', () => {
    let pool;
    let testUserId;

    before(async function() {
        this.timeout(10000);
        pool = await initTestDatabase();
    });

    after(async function() {
        await closeTestDatabase();
    });

    beforeEach(async function() {
        this.timeout(5000);
        await cleanDatabase();

        // Create test user
        const passwordHash = await bcrypt.hash('TestPassword123!', 10);
        const result = await pool.query(
            `INSERT INTO admin_users (email, password_hash, first_name, last_name, role, is_active)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            ['test@example.com', passwordHash, 'Test', 'User', 'admin', true]
        );
        testUserId = result.rows[0].id;
    });

    describe('POST /api/auth/login', () => {
        it('should login with valid credentials', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body.data).to.have.property('token');
                    expect(res.body.data.user).to.have.property('email', 'test@example.com');
                    expect(res.body.data.user).to.not.have.property('password_hash');
                    done();
                });
        });

        it('should reject invalid email', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('success', false);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should reject invalid password', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'WrongPassword'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('success', false);
                    done();
                });
        });

        it('should reject inactive user', async () => {
            // Deactivate user
            await pool.query('UPDATE admin_users SET is_active = false WHERE id = $1', [testUserId]);

            const res = await chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                });

            expect(res).to.have.status(403);
            expect(res.body).to.have.property('success', false);
        });

        it('should validate email format', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'invalid-email',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('success', false);
                    done();
                });
        });

        it('should require password', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('GET /api/auth/me', () => {
        let authToken;

        beforeEach((done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    authToken = res.body.data.token;
                    done();
                });
        });

        it('should get current user with valid token', (done) => {
            chai.request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;
                    expect(res.body.data.user).to.have.property('email', 'test@example.com');
                    done();
                });
        });

        it('should reject request without token', (done) => {
            chai.request(app)
                .get('/api/auth/me')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.success).to.be.false;
                    done();
                });
        });

        it('should reject request with invalid token', (done) => {
            chai.request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer invalid-token')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.success).to.be.false;
                    done();
                });
        });
    });

    describe('POST /api/auth/logout', () => {
        let authToken;

        beforeEach((done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    authToken = res.body.data.token;
                    done();
                });
        });

        it('should logout successfully', (done) => {
            chai.request(app)
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;
                    done();
                });
        });

        it('should require authentication', (done) => {
            chai.request(app)
                .post('/api/auth/logout')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });

    describe('POST /api/auth/change-password', () => {
        let authToken;

        beforeEach((done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'TestPassword123!'
                })
                .end((err, res) => {
                    authToken = res.body.data.token;
                    done();
                });
        });

        it('should change password with valid current password', (done) => {
            chai.request(app)
                .post('/api/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    currentPassword: 'TestPassword123!',
                    newPassword: 'NewPassword456!'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;
                    done();
                });
        });

        it('should reject with wrong current password', (done) => {
            chai.request(app)
                .post('/api/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    currentPassword: 'WrongPassword',
                    newPassword: 'NewPassword456!'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.success).to.be.false;
                    done();
                });
        });

        it('should require minimum password length', (done) => {
            chai.request(app)
                .post('/api/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    currentPassword: 'TestPassword123!',
                    newPassword: 'short'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});
