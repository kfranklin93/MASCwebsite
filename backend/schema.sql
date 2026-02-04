-- ================================================================
-- MOMMY ANGELS SPECIALTY CARE - DATABASE SCHEMA
-- Client Intake & Employee Onboarding Automation System
-- PostgreSQL Database Schema
-- ================================================================

-- Enable UUID extension for unique tokens
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- ADMIN USERS TABLE
-- ================================================================
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'operations_manager', 'bcba', 'admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create default admin users (passwords should be hashed in application)
-- Default password for all: "TempPassword123!" (MUST BE CHANGED IN PRODUCTION)
INSERT INTO admin_users (email, password_hash, first_name, last_name, role) VALUES
('owner@mommyangelsspecialtycare.com', '$2b$10$placeholder', 'Mrs', 'Bolling', 'owner'),
('shruthi@mommyangelsspecialtycare.com', '$2b$10$placeholder', 'Shruthi', 'Operations', 'operations_manager'),
('bcba@mommyangelsspecialtycare.com', '$2b$10$placeholder', 'BCBA', 'Staff', 'bcba');

-- ================================================================
-- CONTACTS TABLE (Website Contact Form Submissions)
-- ================================================================
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    referral_source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'intake_sent', 'completed', 'closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- REGISTRATIONS TABLE (Event Registration Forms)
-- ================================================================
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    parent_first_name VARCHAR(100) NOT NULL,
    parent_last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    child_name VARCHAR(100),
    child_age INTEGER,
    event_type VARCHAR(100) DEFAULT 'new_birth_registration',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'intake_sent', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- INTAKE FORMS TABLE (Detailed Parent Submissions)
-- ================================================================
CREATE TABLE intake_forms (
    id SERIAL PRIMARY KEY,
    token UUID UNIQUE DEFAULT uuid_generate_v4(),
    contact_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
    registration_id INTEGER REFERENCES registrations(id) ON DELETE SET NULL,
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'in_progress', 'submitted', 'under_review', 'completed')),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    
    -- Section 1: Family Information
    parent1_first_name VARCHAR(100),
    parent1_last_name VARCHAR(100),
    parent1_email VARCHAR(255),
    parent1_phone VARCHAR(20),
    parent1_relationship VARCHAR(50),
    parent2_first_name VARCHAR(100),
    parent2_last_name VARCHAR(100),
    parent2_email VARCHAR(255),
    parent2_phone VARCHAR(20),
    parent2_relationship VARCHAR(50),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),
    
    -- Section 2: Child Information
    child_first_name VARCHAR(100),
    child_last_name VARCHAR(100),
    child_dob DATE,
    child_age_years INTEGER,
    child_age_months INTEGER,
    child_gender VARCHAR(20),
    child_ethnicity VARCHAR(50),
    child_primary_language VARCHAR(50),
    other_languages_spoken TEXT,
    
    -- Section 3: Medical & Developmental History
    pediatrician_name VARCHAR(100),
    pediatrician_phone VARCHAR(20),
    diagnoses TEXT,
    diagnosis_date DATE,
    diagnosing_professional VARCHAR(100),
    medications TEXT,
    allergies TEXT,
    dietary_restrictions TEXT,
    developmental_milestones TEXT,
    medical_conditions TEXT,
    
    -- Section 4: Current Services & Therapies
    current_therapies JSONB, -- Array of {type, provider, frequency, duration}
    previous_therapies JSONB,
    current_school VARCHAR(100),
    school_placement VARCHAR(50),
    iep_504_plan BOOLEAN,
    
    -- Section 5: Behavioral & Developmental Ratings (1-5 scale)
    communication_skills INTEGER CHECK (communication_skills BETWEEN 1 AND 5),
    social_skills INTEGER CHECK (social_skills BETWEEN 1 AND 5),
    self_care_skills INTEGER CHECK (self_care_skills BETWEEN 1 AND 5),
    academic_skills INTEGER CHECK (academic_skills BETWEEN 1 AND 5),
    play_skills INTEGER CHECK (play_skills BETWEEN 1 AND 5),
    attention_focus INTEGER CHECK (attention_focus BETWEEN 1 AND 5),
    
    -- Section 6: Behaviors of Concern
    behaviors_of_concern JSONB, -- Array of {behavior, frequency, severity, triggers}
    
    -- Section 7: Strengths & Goals
    child_strengths TEXT,
    child_interests TEXT,
    parent_goals TEXT,
    parent_concerns TEXT,
    
    -- Section 8: Logistics
    preferred_start_date DATE,
    preferred_schedule VARCHAR(100),
    transportation_needs TEXT,
    scheduling_constraints TEXT,
    
    -- Section 9: Insurance & Funding
    has_insurance BOOLEAN,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(100),
    insurance_group_number VARCHAR(100),
    policy_holder_name VARCHAR(100),
    policy_holder_relationship VARCHAR(50),
    medicaid_number VARCHAR(100),
    other_funding_sources TEXT,
    
    -- Section 10: Consent & Signature
    consent_to_evaluate BOOLEAN DEFAULT false,
    consent_to_share_records BOOLEAN DEFAULT false,
    consent_to_photograph BOOLEAN DEFAULT false,
    parent_signature_data TEXT, -- Base64 encoded signature image
    signature_date DATE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL, -- If manually entered
    last_modified_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL
);

-- ================================================================
-- ELIGIBILITY CHECKLIST REVIEWS (BCBA/Operations Manager)
-- ================================================================
CREATE TABLE checklist_reviews (
    id SERIAL PRIMARY KEY,
    intake_form_id INTEGER REFERENCES intake_forms(id) ON DELETE CASCADE,
    reviewer_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    
    -- 17 Eligibility Criteria (Boolean Checkboxes)
    age_appropriate BOOLEAN DEFAULT false,
    diagnosis_appropriate BOOLEAN DEFAULT false,
    medical_clearance BOOLEAN DEFAULT false,
    capacity_available BOOLEAN DEFAULT false,
    staffing_adequate BOOLEAN DEFAULT false,
    geographic_location BOOLEAN DEFAULT false,
    insurance_verified BOOLEAN DEFAULT false,
    funding_secured BOOLEAN DEFAULT false,
    parental_commitment BOOLEAN DEFAULT false,
    behavioral_severity BOOLEAN DEFAULT false,
    safety_concerns_manageable BOOLEAN DEFAULT false,
    communication_level BOOLEAN DEFAULT false,
    previous_services_reviewed BOOLEAN DEFAULT false,
    iep_504_compatibility BOOLEAN DEFAULT false,
    schedule_compatibility BOOLEAN DEFAULT false,
    medical_needs_manageable BOOLEAN DEFAULT false,
    regulatory_compliance BOOLEAN DEFAULT false,
    
    -- Overall Assessment
    criteria_met_count INTEGER,
    total_criteria INTEGER DEFAULT 17,
    
    -- Decision
    decision VARCHAR(50) CHECK (decision IN ('accept', 'evaluation_needed', 'waitlist', 'decline')),
    decision_notes TEXT,
    recommended_next_steps TEXT,
    follow_up_assigned_to INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    follow_up_due_date DATE,
    
    -- Metadata
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- EMPLOYEES TABLE
-- ================================================================
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    token UUID UNIQUE DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    hire_date DATE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'documents_uploaded', 'active', 'inactive', 'terminated')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL
);

-- ================================================================
-- EMPLOYEE DOCUMENTS TABLE
-- ================================================================
CREATE TABLE employee_documents (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL CHECK (document_type IN (
        'application',
        'i9',
        'id_front',
        'id_back',
        'rbt_certificate',
        'cpr_certificate',
        'first_aid_certificate',
        'background_check',
        'health_safety_10hr',
        'college_certificate',
        'other'
    )),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL, -- S3 URL
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Expiration tracking
    expiration_date DATE,
    requires_renewal BOOLEAN DEFAULT false,
    
    -- AI extraction (optional)
    ai_extracted_data JSONB,
    ai_confidence_score DECIMAL(5,2),
    ai_processed_at TIMESTAMP,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
    
    -- Metadata
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL, -- If admin uploaded
    verified_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- EMAIL LOGS TABLE (Track All Automated Emails)
-- ================================================================
CREATE TABLE email_logs (
    id SERIAL PRIMARY KEY,
    recipient_email VARCHAR(255) NOT NULL,
    email_type VARCHAR(100) NOT NULL CHECK (email_type IN (
        'contact_confirmation',
        'intake_request',
        'acceptance',
        'evaluation_needed',
        'waitlist',
        'decline',
        'employee_welcome',
        'expiration_30_days',
        'expiration_7_days',
        'expiration_expired',
        'manual'
    )),
    subject VARCHAR(255),
    template_used VARCHAR(100),
    
    -- Related records
    contact_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
    registration_id INTEGER REFERENCES registrations(id) ON DELETE SET NULL,
    intake_form_id INTEGER REFERENCES intake_forms(id) ON DELETE SET NULL,
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    document_id INTEGER REFERENCES employee_documents(id) ON DELETE SET NULL,
    
    -- SendGrid tracking
    sendgrid_message_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
    error_message TEXT,
    
    -- Metadata
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- AUDIT LOGS TABLE (Track All System Changes)
-- ================================================================
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- INDEXES FOR PERFORMANCE
-- ================================================================

-- Contacts
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Registrations
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Intake Forms
CREATE INDEX idx_intake_forms_token ON intake_forms(token);
CREATE INDEX idx_intake_forms_contact_id ON intake_forms(contact_id);
CREATE INDEX idx_intake_forms_status ON intake_forms(status);
CREATE INDEX idx_intake_forms_submitted_at ON intake_forms(submitted_at DESC);

-- Checklist Reviews
CREATE INDEX idx_checklist_reviews_intake_form_id ON checklist_reviews(intake_form_id);
CREATE INDEX idx_checklist_reviews_decision ON checklist_reviews(decision);
CREATE INDEX idx_checklist_reviews_reviewed_at ON checklist_reviews(reviewed_at DESC);

-- Employees
CREATE INDEX idx_employees_token ON employees(token);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_hire_date ON employees(hire_date DESC);

-- Employee Documents
CREATE INDEX idx_employee_documents_employee_id ON employee_documents(employee_id);
CREATE INDEX idx_employee_documents_type ON employee_documents(document_type);
CREATE INDEX idx_employee_documents_expiration ON employee_documents(expiration_date);
CREATE INDEX idx_employee_documents_status ON employee_documents(status);

-- Email Logs
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ================================================================
-- FUNCTIONS FOR AUTO-UPDATE TIMESTAMPS
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intake_forms_updated_at BEFORE UPDATE ON intake_forms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_reviews_updated_at BEFORE UPDATE ON checklist_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_documents_updated_at BEFORE UPDATE ON employee_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- VIEWS FOR COMMON QUERIES
-- ================================================================

-- Expiring documents view (for dashboard)
CREATE VIEW expiring_documents AS
SELECT 
    ed.id,
    ed.employee_id,
    e.first_name || ' ' || e.last_name AS employee_name,
    e.email AS employee_email,
    ed.document_type,
    ed.expiration_date,
    ed.file_url,
    CASE 
        WHEN ed.expiration_date < CURRENT_DATE THEN 'expired'
        WHEN ed.expiration_date <= CURRENT_DATE + INTERVAL '7 days' THEN 'critical'
        WHEN ed.expiration_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'warning'
        ELSE 'valid'
    END AS status,
    ed.expiration_date - CURRENT_DATE AS days_until_expiration
FROM employee_documents ed
JOIN employees e ON ed.employee_id = e.id
WHERE ed.expiration_date IS NOT NULL
    AND ed.status != 'rejected'
ORDER BY ed.expiration_date ASC;

-- Intake forms pending review
CREATE VIEW pending_intake_reviews AS
SELECT 
    if_.*,
    c.first_name AS contact_first_name,
    c.last_name AS contact_last_name,
    c.email AS contact_email,
    r.parent_first_name AS registration_first_name,
    r.parent_last_name AS registration_last_name
FROM intake_forms if_
LEFT JOIN contacts c ON if_.contact_id = c.id
LEFT JOIN registrations r ON if_.registration_id = r.id
WHERE if_.status = 'submitted'
    AND NOT EXISTS (
        SELECT 1 FROM checklist_reviews cr 
        WHERE cr.intake_form_id = if_.id
    )
ORDER BY if_.submitted_at ASC;

-- ================================================================
-- GRANT PERMISSIONS (Adjust based on your user setup)
-- ================================================================
-- Example: GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO masc_app_user;
-- Example: GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO masc_app_user;

-- ================================================================
-- END OF SCHEMA
-- ================================================================
