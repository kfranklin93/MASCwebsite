// ================================================================
// TEST CONFIGURATION
// Set up test environment variables
// ================================================================

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_NAME = 'masc_test_db';
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'postgres';
process.env.DB_SSL = 'false';

// Mock AWS S3
process.env.AWS_ACCESS_KEY_ID = 'test-key';
process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
process.env.AWS_S3_BUCKET_NAME = 'test-bucket';
process.env.AWS_REGION = 'us-east-1';

// Mock SendGrid
process.env.SENDGRID_API_KEY = 'test-sendgrid-key';
process.env.SENDGRID_FROM_EMAIL = 'test@example.com';
process.env.SENDGRID_FROM_NAME = 'Test';

process.env.WEBSITE_URL = 'http://localhost:3000';
process.env.ADMIN_EMAIL = 'admin@example.com';
