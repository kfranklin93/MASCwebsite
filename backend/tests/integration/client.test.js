// ================================================================
// CLIENT ROUTE INTEGRATION TESTS
// ================================================================

require('../setup');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const { initTestDatabase, cleanDatabase, closeTestDatabase, getTestPool } = require('../helpers/database');

chai.use(chaiHttp);

const app = require('../../server');

describe('Client Routes', () => {
    let pool;

    before(async function() {
        this.timeout(10000);
        pool = await initTestDatabase();
    });

    after(async function() {
        await closeTestDatabase();
    });

    beforeEach(async function() {
        await cleanDatabase();
    });

    describe('POST /api/client/contact', () => {
        it('should submit contact form successfully', (done) => {
            chai.request(app)
                .post('/api/client/contact')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '555-0100',
                    message: 'Interested in ABA services',
                    referralSource: 'Google'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body.data.contact).to.have.property('id');
                    expect(res.body.data.contact).to.have.property('email', 'john.doe@example.com');
                    expect(res.body.data.contact).to.have.property('status', 'new');
                    done();
                });
        });

        it('should validate required fields', (done) => {
            chai.request(app)
                .post('/api/client/contact')
                .send({
                    firstName: 'John'
                    // Missing required fields
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('success', false);
                    done();
                });
        });

        it('should validate email format', (done) => {
            chai.request(app)
                .post('/api/client/contact')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'invalid-email',
                    message: 'Test'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('POST /api/client/register', () => {
        it('should submit registration successfully', (done) => {
            chai.request(app)
                .post('/api/client/register')
                .send({
                    parentFirstName: 'Jane',
                    parentLastName: 'Smith',
                    email: 'jane.smith@example.com',
                    phone: '555-0200',
                    childName: 'Tommy',
                    childAge: 4,
                    eventType: 'new_birth_registration',
                    notes: 'Looking forward to the event'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body.data.registration).to.have.property('id');
                    expect(res.body.data.registration).to.have.property('status', 'pending');
                    done();
                });
        });
    });

    describe('Intake Form Routes', () => {
        let intakeToken;
        let contactId;

        beforeEach(async () => {
            // Create a contact
            const contactResult = await pool.query(
                `INSERT INTO contacts (first_name, last_name, email, phone, status)
                 VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                ['Test', 'Parent', 'test@example.com', '555-0300', 'new']
            );
            contactId = contactResult.rows[0].id;

            // Create intake form
            const intakeResult = await pool.query(
                `INSERT INTO intake_forms (contact_id, status, parent1_first_name, parent1_last_name, parent1_email)
                 VALUES ($1, $2, $3, $4, $5) RETURNING token`,
                [contactId, 'sent', 'Test', 'Parent', 'test@example.com']
            );
            intakeToken = intakeResult.rows[0].token;
        });

        describe('GET /api/client/intake/:token', () => {
            it('should get intake form by valid token', (done) => {
                chai.request(app)
                    .get(`/api/client/intake/${intakeToken}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('success', true);
                        expect(res.body.data.intakeForm).to.have.property('token', intakeToken);
                        expect(res.body.data.intakeForm).to.have.property('status', 'sent');
                        done();
                    });
            });

            it('should return 404 for invalid token', (done) => {
                chai.request(app)
                    .get('/api/client/intake/invalid-token-123')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('success', false);
                        done();
                    });
            });

            it('should reject already submitted form', async () => {
                // Mark form as submitted
                await pool.query(
                    'UPDATE intake_forms SET status = $1 WHERE token = $2',
                    ['submitted', intakeToken]
                );

                const res = await chai.request(app)
                    .get(`/api/client/intake/${intakeToken}`);

                expect(res).to.have.status(400);
                expect(res.body.error).to.include('already submitted');
            });
        });

        describe('PUT /api/client/intake/:token', () => {
            it('should update intake form', (done) => {
                chai.request(app)
                    .put(`/api/client/intake/${intakeToken}`)
                    .send({
                        childFirstName: 'Sarah',
                        childLastName: 'Parent',
                        childAgeYears: 5,
                        status: 'in_progress'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('success', true);
                        expect(res.body.data.intakeForm).to.have.property('child_first_name', 'Sarah');
                        done();
                    });
            });

            it('should submit intake form', (done) => {
                chai.request(app)
                    .put(`/api/client/intake/${intakeToken}`)
                    .send({
                        childFirstName: 'Sarah',
                        status: 'submitted'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.include('submitted');
                        expect(res.body.data.intakeForm).to.have.property('status', 'submitted');
                        expect(res.body.data.intakeForm).to.have.property('submitted_at');
                        done();
                    });
            });

            it('should return 404 for invalid token', (done) => {
                chai.request(app)
                    .put('/api/client/intake/invalid-token')
                    .send({ childFirstName: 'Test' })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });
    });
});
