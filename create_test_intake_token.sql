-- Create a test intake form token for testing
-- This script creates a test token you can use to access the intake form

-- First, check if we have any contacts
SELECT id, first_name, last_name, email FROM contacts LIMIT 1;

-- Create a test token (replace contact_id with an actual ID from above)
-- Run this after checking the contact ID:
-- INSERT INTO intake_forms (
--   token, 
--   contact_id, 
--   status, 
--   parent1_first_name, 
--   parent1_last_name, 
--   parent1_email, 
--   parent1_phone
-- )
-- VALUES (
--   'test-token-12345',  -- Simple token for testing
--   1,                    -- Replace with actual contact_id
--   'sent',
--   'Test',
--   'Parent',
--   'test@example.com',
--   '555-1234'
-- )
-- RETURNING token;

-- Or generate a UUID token (more secure):
-- SELECT gen_random_uuid();
