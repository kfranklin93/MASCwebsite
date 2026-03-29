// ================================================================
// DATABASE TEST HELPER
// Utility functions for test database management
// ================================================================

const { Pool } = require('pg');

let testPool;

const createTestDatabase = async () => {
    // Connect to default postgres database to create test database
    const adminPool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: 'postgres',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
    });

    try {
        // Drop test database if exists
        await adminPool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
        // Create test database
        await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Test database ${process.env.DB_NAME} created`);
    } catch (error) {
        console.error('Error creating test database:', error);
    } finally {
        await adminPool.end();
    }
};

const initTestDatabase = async () => {
    testPool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
    });

    // Run schema (simplified version for testing)
    const schema = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        CREATE TABLE admin_users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            role VARCHAR(50) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE contacts (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            message TEXT,
            referral_source VARCHAR(100),
            status VARCHAR(50) DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE registrations (
            id SERIAL PRIMARY KEY,
            parent_first_name VARCHAR(100) NOT NULL,
            parent_last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            child_name VARCHAR(100),
            child_age INTEGER,
            event_type VARCHAR(100) DEFAULT 'new_birth_registration',
            status VARCHAR(50) DEFAULT 'pending',
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE intake_forms (
            id SERIAL PRIMARY KEY,
            token UUID UNIQUE DEFAULT uuid_generate_v4(),
            contact_id INTEGER REFERENCES contacts(id),
            status VARCHAR(50) DEFAULT 'sent',
            parent1_first_name VARCHAR(100),
            parent1_last_name VARCHAR(100),
            parent1_email VARCHAR(255),
            child_first_name VARCHAR(100),
            child_last_name VARCHAR(100),
            submitted_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE employees (
            id SERIAL PRIMARY KEY,
            token UUID UNIQUE DEFAULT uuid_generate_v4(),
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            position VARCHAR(100),
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE email_logs (
            id SERIAL PRIMARY KEY,
            recipient_email VARCHAR(255) NOT NULL,
            email_type VARCHAR(100) NOT NULL,
            subject VARCHAR(255),
            status VARCHAR(50) DEFAULT 'sent',
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE audit_logs (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES admin_users(id),
            action VARCHAR(100) NOT NULL,
            table_name VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await testPool.query(schema);
        console.log('Test database schema initialized');
    } catch (error) {
        console.error('Error initializing schema:', error);
        throw error;
    }

    return testPool;
};

const cleanDatabase = async () => {
    if (!testPool) return;

    const tables = [
        'audit_logs',
        'email_logs',
        'employees',
        'intake_forms',
        'registrations',
        'contacts',
        'admin_users'
    ];

    try {
        for (const table of tables) {
            await testPool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
        }
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
};

const closeTestDatabase = async () => {
    if (testPool) {
        await testPool.end();
        testPool = null;
    }
};

const getTestPool = () => testPool;

module.exports = {
    createTestDatabase,
    initTestDatabase,
    cleanDatabase,
    closeTestDatabase,
    getTestPool
};
