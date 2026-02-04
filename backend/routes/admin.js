// ================================================================
// ADMIN ROUTES  
// Admin dashboard, intake management, employee management
// ================================================================

const express = require('express');
const router = express.Router();
const { query, transaction } = require('../config/database');
const { sendEmail } = require('../config/email');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { 
    intakeFormRequest,
    acceptanceEmail,
    evaluationNeededEmail,
    waitlistEmail,
    declineEmail,
    employeeWelcomeEmail,
    expirationWarning30Days,
    expirationCritical7Days,
    documentExpiredEmail
} = require('../utils/emailTemplates');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

// All admin routes require authentication
router.use(authenticateToken);

// ================================================================
// DASHBOARD & STATS
// ================================================================

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard statistics
 * @access  Private (All admin roles)
 */
router.get('/dashboard', async (req, res) => {
    try {
        // Get various counts
        const stats = await query(`
            SELECT 
                (SELECT COUNT(*) FROM contacts WHERE status = 'new') as new_contacts,
                (SELECT COUNT(*) FROM registrations WHERE status = 'pending') as pending_registrations,
                (SELECT COUNT(*) FROM intake_forms WHERE status = 'submitted') as pending_reviews,
                (SELECT COUNT(*) FROM employees WHERE status = 'pending') as pending_employees,
                (SELECT COUNT(*) FROM employee_documents WHERE expiration_date < CURRENT_DATE) as expired_documents,
                (SELECT COUNT(*) FROM employee_documents WHERE expiration_date <= CURRENT_DATE + INTERVAL '7 days' AND expiration_date >= CURRENT_DATE) as expiring_soon
        `);

        res.json({
            success: true,
            data: { stats: stats.rows[0] }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve dashboard stats'
        });
    }
});

// ================================================================
// CONTACT MANAGEMENT
// ================================================================

/**
 * @route   GET /api/admin/contacts
 * @desc    Get all contacts with filtering
 * @access  Private
 */
router.get('/contacts', async (req, res) => {
    try {
        const { status, search, limit = 50, offset = 0 } = req.query;

        // Select with concatenated parent_name for frontend compatibility
        let queryText = `SELECT 
            id, 
            first_name, 
            last_name, 
            first_name || ' ' || last_name as parent_name,
            email, 
            phone, 
            message, 
            referral_source, 
            status, 
            created_at, 
            updated_at 
        FROM contacts WHERE 1=1`;
        const values = [];
        let paramCount = 1;

        if (status) {
            queryText += ` AND status = $${paramCount}`;
            values.push(status);
            paramCount++;
        }

        if (search) {
            queryText += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
            values.push(`%${search}%`);
            paramCount++;
        }

        queryText += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        const result = await query(queryText, values);

        // Get total count
        let countQuery = 'SELECT COUNT(*) FROM contacts WHERE 1=1';
        const countValues = [];
        let countParamCount = 1;

        if (status) {
            countQuery += ` AND status = $${countParamCount}`;
            countValues.push(status);
            countParamCount++;
        }

        if (search) {
            countQuery += ` AND (first_name ILIKE $${countParamCount} OR last_name ILIKE $${countParamCount} OR email ILIKE $${countParamCount})`;
            countValues.push(`%${search}%`);
        }

        const countResult = await query(countQuery, countValues);

        res.json({
            success: true,
            data: {
                contacts: result.rows,
                total: parseInt(countResult.rows[0].count),
                limit: parseInt(limit),
                offset: parseInt(offset)
            }
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve contacts'
        });
    }
});

/**
 * @route   POST /api/admin/contacts/:id/send-intake
 * @desc    Send intake form to contact
 * @access  Private
 */
router.post('/contacts/:id/send-intake', async (req, res) => {
    try {
        const { id } = req.params;

        // Get contact
        const contactResult = await query(
            'SELECT * FROM contacts WHERE id = $1',
            [id]
        );

        if (contactResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        const contact = contactResult.rows[0];

        // Create intake form with unique token
        const token = uuidv4();
        const intakeResult = await query(
            `INSERT INTO intake_forms (token, contact_id, status, parent1_first_name, parent1_last_name, parent1_email, parent1_phone)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [token, contact.id, 'sent', contact.first_name, contact.last_name, contact.email, contact.phone]
        );

        const intakeForm = intakeResult.rows[0];

        // Send email with intake link (don't fail if email fails)
        try {
            const emailHtml = intakeFormRequest(`${contact.first_name} ${contact.last_name}`, token);
            await sendEmail({
                to: contact.email,
                subject: 'Complete Your Intake Form - Mommy Angels Specialty Care',
                html: emailHtml
            });

            // Log email success
            await query(
                `INSERT INTO email_logs (recipient_email, email_type, subject, contact_id, intake_form_id, status, sent_by)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [contact.email, 'intake_request', 'Complete Your Intake Form', contact.id, intakeForm.id, 'sent', req.user.id]
            );
        } catch (emailError) {
            console.error('❌ Error sending email:', emailError);
            console.error('SendGrid error response:', emailError.response?.body);
            
            // Log email failure
            await query(
                `INSERT INTO email_logs (recipient_email, email_type, subject, contact_id, intake_form_id, status, sent_by)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [contact.email, 'intake_request', 'Complete Your Intake Form', contact.id, intakeForm.id, 'failed', req.user.id]
            );
            // Don't fail the request - intake form was still created
        }

        // Update contact status
        await query(
            'UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['intake_sent', contact.id]
        );

        res.json({
            success: true,
            message: 'Intake form created successfully (email may not have sent - check SendGrid credits)',
            data: { 
                intakeForm,
                intakeUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/client-portal/intake/${token}`
            }
        });
    } catch (error) {
        console.error('Send intake error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send intake form'
        });
    }
});

// ================================================================
// INTAKE FORM MANAGEMENT
// ================================================================

/**
 * @route   GET /api/admin/intake-forms
 * @desc    Get all intake forms
 * @access  Private
 */
router.get('/intake-forms', async (req, res) => {
    try {
        const { status, limit = 50, offset = 0 } = req.query;

        let queryText = `
            SELECT 
                if_.*,
                c.first_name as contact_first_name,
                c.last_name as contact_last_name,
                r.parent_first_name as registration_first_name,
                r.parent_last_name as registration_last_name
            FROM intake_forms if_
            LEFT JOIN contacts c ON if_.contact_id = c.id
            LEFT JOIN registrations r ON if_.registration_id = r.id
            WHERE 1=1
        `;
        const values = [];
        let paramCount = 1;

        if (status) {
            queryText += ` AND if_.status = $${paramCount}`;
            values.push(status);
            paramCount++;
        }

        queryText += ` ORDER BY if_.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        const result = await query(queryText, values);

        res.json({
            success: true,
            data: { intakeForms: result.rows }
        });
    } catch (error) {
        console.error('Get intake forms error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve intake forms'
        });
    }
});

/**
 * @route   GET /api/admin/intake-forms/:id
 * @desc    Get single intake form by ID
 * @access  Private
 */
router.get('/intake-forms/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT if_.*, cr.* 
             FROM intake_forms if_
             LEFT JOIN checklist_reviews cr ON cr.intake_form_id = if_.id
             WHERE if_.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Intake form not found'
            });
        }

        res.json({
            success: true,
            data: { intakeForm: result.rows[0] }
        });
    } catch (error) {
        console.error('Get intake form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve intake form'
        });
    }
});

/**
 * @route   POST /api/admin/intake-forms
 * @desc    Create intake form manually (from paper form)
 * @access  Private
 */
router.post('/intake-forms', async (req, res) => {
    try {
        const formData = req.body;
        const token = uuidv4();

        // Insert intake form
        const result = await query(
            `INSERT INTO intake_forms (token, status, created_by, ${Object.keys(formData).join(', ')})
             VALUES ($1, $2, $3, ${Object.keys(formData).map((_, i) => `$${i + 4}`).join(', ')})
             RETURNING *`,
            [token, 'submitted', req.user.id, ...Object.values(formData)]
        );

        res.status(201).json({
            success: true,
            message: 'Intake form created successfully',
            data: { intakeForm: result.rows[0] }
        });
    } catch (error) {
        console.error('Create intake form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create intake form'
        });
    }
});

// ================================================================
// BCBA CHECKLIST & DECISIONS
// ================================================================

/**
 * @route   POST /api/admin/intake-forms/:id/review
 * @desc    Submit BCBA eligibility checklist and decision
 * @access  Private (BCBA, Operations Manager, Owner)
 */
router.post('/intake-forms/:id/review',
    authorizeRole('bcba', 'operations_manager', 'owner'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const {
                // 17 eligibility criteria
                ageAppropriate,
                diagnosisAppropriate,
                medicalClearance,
                capacityAvailable,
                staffingAdequate,
                geographicLocation,
                insuranceVerified,
                fundingSecured,
                parentalCommitment,
                behavioralSeverity,
                safetyConcernsManageable,
                communicationLevel,
                previousServicesReviewed,
                iep504Compatibility,
                scheduleCompatibility,
                medicalNeedsManageable,
                regulatoryCompliance,
                // Decision
                decision,
                decisionNotes,
                recommendedNextSteps,
                followUpAssignedTo,
                followUpDueDate
            } = req.body;

            // Count criteria met
            const criteria = [
                ageAppropriate, diagnosisAppropriate, medicalClearance, capacityAvailable,
                staffingAdequate, geographicLocation, insuranceVerified, fundingSecured,
                parentalCommitment, behavioralSeverity, safetyConcernsManageable,
                communicationLevel, previousServicesReviewed, iep504Compatibility,
                scheduleCompatibility, medicalNeedsManageable, regulatoryCompliance
            ];
            const criteriaMet = criteria.filter(Boolean).length;

            // Insert checklist review
            const reviewResult = await query(
                `INSERT INTO checklist_reviews (
                    intake_form_id, reviewer_id,
                    age_appropriate, diagnosis_appropriate, medical_clearance, capacity_available,
                    staffing_adequate, geographic_location, insurance_verified, funding_secured,
                    parental_commitment, behavioral_severity, safety_concerns_manageable,
                    communication_level, previous_services_reviewed, iep_504_compatibility,
                    schedule_compatibility, medical_needs_manageable, regulatory_compliance,
                    criteria_met_count, decision, decision_notes, recommended_next_steps,
                    follow_up_assigned_to, follow_up_due_date
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
                RETURNING *`,
                [
                    id, req.user.id,
                    ageAppropriate, diagnosisAppropriate, medicalClearance, capacityAvailable,
                    staffingAdequate, geographicLocation, insuranceVerified, fundingSecured,
                    parentalCommitment, behavioralSeverity, safetyConcernsManageable,
                    communicationLevel, previousServicesReviewed, iep504Compatibility,
                    scheduleCompatibility, medicalNeedsManageable, regulatoryCompliance,
                    criteriaMet, decision, decisionNotes, recommendedNextSteps,
                    followUpAssignedTo, followUpDueDate
                ]
            );

            // Update intake form status
            await query(
                'UPDATE intake_forms SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                ['completed', id]
            );

            // Get intake form for email
            const intakeResult = await query(
                'SELECT * FROM intake_forms WHERE id = $1',
                [id]
            );
            const intakeForm = intakeResult.rows[0];

            // Send appropriate email based on decision
            let emailTemplate;
            let emailSubject;
            const parentName = `${intakeForm.parent1_first_name} ${intakeForm.parent1_last_name}`;
            const childName = `${intakeForm.child_first_name} ${intakeForm.child_last_name}`;

            switch (decision) {
                case 'accept':
                    emailTemplate = acceptanceEmail(parentName, childName);
                    emailSubject = 'Welcome to Mommy Angels Specialty Care!';
                    break;
                case 'evaluation_needed':
                    emailTemplate = evaluationNeededEmail(parentName, childName);
                    emailSubject = 'Next Steps - Evaluation Required';
                    break;
                case 'waitlist':
                    emailTemplate = waitlistEmail(parentName, childName);
                    emailSubject = 'Added to Waitlist - Mommy Angels Specialty Care';
                    break;
                case 'decline':
                    emailTemplate = declineEmail(parentName, childName, decisionNotes);
                    emailSubject = 'Application Update - Mommy Angels Specialty Care';
                    break;
            }

            // Send email
            await sendEmail({
                to: intakeForm.parent1_email,
                subject: emailSubject,
                html: emailTemplate
            });

            // Log email
            await query(
                `INSERT INTO email_logs (recipient_email, email_type, subject, intake_form_id, status, sent_by)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [intakeForm.parent1_email, decision, emailSubject, id, 'sent', req.user.id]
            );

            res.json({
                success: true,
                message: `Review submitted and ${decision} email sent`,
                data: { review: reviewResult.rows[0] }
            });
        } catch (error) {
            console.error('Submit review error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to submit review',
                message: error.message
            });
        }
    }
);

// ================================================================
// EMPLOYEE MANAGEMENT
// ================================================================

/**
 * @route   GET /api/admin/employees
 * @desc    Get all employees
 * @access  Private
 */
router.get('/employees', async (req, res) => {
    try {
        const { status, search, limit = 50, offset = 0 } = req.query;

        let queryText = 'SELECT * FROM employees WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (status) {
            queryText += ` AND status = $${paramCount}`;
            values.push(status);
            paramCount++;
        }

        if (search) {
            queryText += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
            values.push(`%${search}%`);
            paramCount++;
        }

        queryText += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        const result = await query(queryText, values);

        res.json({
            success: true,
            data: { employees: result.rows }
        });
    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve employees'
        });
    }
});

/**
 * @route   POST /api/admin/employees
 * @desc    Create new employee and send welcome email
 * @access  Private
 */
router.post('/employees',
    [
        body('firstName').trim().notEmpty(),
        body('lastName').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('position').optional(),
        body('hireDate').optional().isDate()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors.array()
                });
            }

            const { firstName, lastName, email, phone, position, hireDate } = req.body;
            const token = uuidv4();

            // Insert employee
            const result = await query(
                `INSERT INTO employees (token, first_name, last_name, email, phone, position, hire_date, status, created_by)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING *`,
                [token, firstName, lastName, email, phone, position, hireDate, 'pending', req.user.id]
            );

            const employee = result.rows[0];

            // Send welcome email with upload link
            const emailHtml = employeeWelcomeEmail(`${firstName} ${lastName}`, token);
            await sendEmail({
                to: email,
                subject: 'Welcome to Mommy Angels - Document Upload Required',
                html: emailHtml
            });

            // Log email
            await query(
                `INSERT INTO email_logs (recipient_email, email_type, subject, employee_id, status, sent_by)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [email, 'employee_welcome', 'Welcome to Mommy Angels', employee.id, 'sent', req.user.id]
            );

            res.status(201).json({
                success: true,
                message: 'Employee created and welcome email sent',
                data: { employee }
            });
        } catch (error) {
            console.error('Create employee error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create employee',
                message: error.message
            });
        }
    }
);

/**
 * @route   GET /api/admin/employees/:id/documents
 * @desc    Get all documents for an employee
 * @access  Private
 */
router.get('/employees/:id/documents', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT * FROM employee_documents 
             WHERE employee_id = $1 
             ORDER BY uploaded_at DESC`,
            [id]
        );

        res.json({
            success: true,
            data: { documents: result.rows }
        });
    } catch (error) {
        console.error('Get employee documents error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve documents'
        });
    }
});

/**
 * @route   PUT /api/admin/employees/:id
 * @desc    Update employee
 * @access  Private
 */
router.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Build dynamic update query
        const updateFields = [];
        const values = [];
        let paramCount = 1;

        const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'position', 'hire_date', 'status'];
        
        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key)) {
                updateFields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid fields to update'
            });
        }

        values.push(id);
        const updateQuery = `
            UPDATE employees 
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $${paramCount}
            RETURNING *
        `;

        const result = await query(updateQuery, values);

        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: { employee: result.rows[0] }
        });
    } catch (error) {
        console.error('Update employee error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update employee'
        });
    }
});

// ================================================================
// EXPIRATION TRACKING
// ================================================================

/**
 * @route   GET /api/admin/expirations
 * @desc    Get all documents with expiration tracking
 * @access  Private
 */
router.get('/expirations', async (req, res) => {
    try {
        const { status } = req.query;

        let queryText = 'SELECT * FROM expiring_documents';
        const values = [];

        if (status) {
            queryText += ' WHERE status = $1';
            values.push(status);
        }

        queryText += ' ORDER BY expiration_date ASC';

        const result = await query(queryText, values);

        res.json({
            success: true,
            data: { expirations: result.rows }
        });
    } catch (error) {
        console.error('Get expirations error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve expiration data'
        });
    }
});

/**
 * @route   PUT /api/admin/documents/:id/expiration
 * @desc    Update document expiration date
 * @access  Private
 */
router.put('/documents/:id/expiration',
    [body('expirationDate').isDate()],
    async (req, res) => {
        try {
            const { id } = req.params;
            const { expirationDate } = req.body;

            const result = await query(
                `UPDATE employee_documents 
                 SET expiration_date = $1, updated_at = CURRENT_TIMESTAMP, verified_by = $2, verified_at = CURRENT_TIMESTAMP
                 WHERE id = $3
                 RETURNING *`,
                [expirationDate, req.user.id, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Document not found'
                });
            }

            res.json({
                success: true,
                message: 'Expiration date updated',
                data: { document: result.rows[0] }
            });
        } catch (error) {
            console.error('Update expiration error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update expiration date'
            });
        }
    }
);

/**
 * @route   POST /api/admin/documents/:id/send-reminder
 * @desc    Manually send expiration reminder email
 * @access  Private
 */
router.post('/documents/:id/send-reminder', async (req, res) => {
    try {
        const { id } = req.params;

        // Get document and employee info
        const result = await query(
            `SELECT ed.*, e.first_name, e.last_name, e.email
             FROM employee_documents ed
             JOIN employees e ON ed.employee_id = e.id
             WHERE ed.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        const doc = result.rows[0];
        const employeeName = `${doc.first_name} ${doc.last_name}`;
        const expirationDate = new Date(doc.expiration_date).toLocaleDateString();

        // Determine email template based on days until expiration
        const daysUntil = Math.ceil((new Date(doc.expiration_date) - new Date()) / (1000 * 60 * 60 * 24));
        let emailHtml, emailSubject;

        if (daysUntil < 0) {
            emailHtml = documentExpiredEmail(employeeName, doc.document_type, expirationDate);
            emailSubject = 'URGENT: Document Expired';
        } else if (daysUntil <= 7) {
            emailHtml = expirationCritical7Days(employeeName, doc.document_type, expirationDate);
            emailSubject = 'URGENT: Document Expiring Soon';
        } else {
            emailHtml = expirationWarning30Days(employeeName, doc.document_type, expirationDate);
            emailSubject = 'Document Expiration Reminder';
        }

        // Send email
        await sendEmail({
            to: doc.email,
            subject: emailSubject,
            html: emailHtml
        });

        // Log email
        await query(
            `INSERT INTO email_logs (recipient_email, email_type, subject, employee_id, document_id, status, sent_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [doc.email, daysUntil < 0 ? 'expiration_expired' : daysUntil <= 7 ? 'expiration_7_days' : 'expiration_30_days', 
             emailSubject, doc.employee_id, id, 'sent', req.user.id]
        );

        res.json({
            success: true,
            message: 'Reminder email sent successfully'
        });
    } catch (error) {
        console.error('Send reminder error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send reminder email'
        });
    }
});

module.exports = router;
