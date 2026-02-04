// ================================================================
// CLIENT ROUTES
// Public endpoints for contact forms, registrations, and intake forms
// ================================================================

const express = require('express');
const router = express.Router();
const { query, transaction } = require('../config/database');
const { sendEmail } = require('../config/email');
const { contactConfirmation } = require('../utils/emailTemplates');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

/**
 * @route   POST /api/client/contact
 * @desc    Submit contact form from website
 * @access  Public
 */
router.post('/contact',
    [
        body('firstName').trim().notEmpty(),
        body('lastName').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('phone').optional(),
        body('message').optional(),
        body('referralSource').optional()
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

            const { firstName, lastName, email, phone, message, referralSource } = req.body;

            // Insert contact
            const result = await query(
                `INSERT INTO contacts (first_name, last_name, email, phone, message, referral_source, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [firstName, lastName, email, phone, message, referralSource, 'new']
            );

            const contact = result.rows[0];

            // Send confirmation email to parent
            try {
                const emailHtml = contactConfirmation(`${firstName} ${lastName}`);
                await sendEmail({
                    to: email,
                    subject: 'Thank You for Contacting Mommy Angels Specialty Care',
                    html: emailHtml
                });

                // Log email
                await query(
                    `INSERT INTO email_logs (recipient_email, email_type, subject, contact_id, status)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [email, 'contact_confirmation', 'Thank You for Contacting Mommy Angels Specialty Care', contact.id, 'sent']
                );
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
                // Don't fail the request if email fails
            }

            res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully',
                data: { contact }
            });
        } catch (error) {
            console.error('Contact form error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to submit contact form',
                message: error.message
            });
        }
    }
);

/**
 * @route   POST /api/client/register
 * @desc    Submit registration form (e.g., New Birth registration)
 * @access  Public
 */
router.post('/register',
    [
        body('parentFirstName').trim().notEmpty(),
        body('parentLastName').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('phone').optional(),
        body('childName').optional(),
        body('childAge').optional().isInt(),
        body('eventType').optional(),
        body('notes').optional()
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

            const {
                parentFirstName,
                parentLastName,
                email,
                phone,
                childName,
                childAge,
                eventType,
                notes
            } = req.body;

            // Build message from child info if provided
            let message = notes || '';
            if (childName || childAge) {
                message = `Child: ${childName || 'N/A'}, Age: ${childAge || 'N/A'}. ${notes || ''}`.trim();
            }

            // Insert into contacts table (so it appears in admin dashboard)
            const result = await query(
                `INSERT INTO contacts 
                 (first_name, last_name, email, phone, message, referral_source, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [parentFirstName, parentLastName, email, phone, message, eventType || 'Client Portal Registration', 'new']
            );

            const contact = result.rows[0];

            // Send confirmation email
            try {
                const emailHtml = contactConfirmation(`${parentFirstName} ${parentLastName}`);
                await sendEmail({
                    to: email,
                    subject: 'Registration Received - Mommy Angels Specialty Care',
                    html: emailHtml
                });

                await query(
                    `INSERT INTO email_logs (recipient_email, email_type, subject, contact_id, status)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [email, 'registration_confirmation', 'Registration Received', contact.id, 'sent']
                );
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
            }

            res.status(201).json({
                success: true,
                message: 'Registration submitted successfully',
                data: { contact }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to submit registration',
                message: error.message
            });
        }
    }
);

/**
 * @route   GET /api/client/intake/:token
 * @desc    Get intake form by unique token
 * @access  Public
 */
router.get('/intake/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const result = await query(
            `SELECT * FROM intake_forms WHERE token = $1`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Intake form not found',
                message: 'Invalid or expired intake link'
            });
        }

        const intakeForm = result.rows[0];

        // Check if already submitted
        if (intakeForm.status === 'submitted' || intakeForm.status === 'completed') {
            return res.status(400).json({
                success: false,
                error: 'Form already submitted',
                message: 'This intake form has already been completed'
            });
        }

        res.json({
            success: true,
            data: { intakeForm }
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
 * @route   PUT /api/client/intake/:token
 * @desc    Update/submit intake form
 * @access  Public
 */
router.put('/intake/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const formData = req.body;

        // Check if form exists
        const checkResult = await query(
            'SELECT id, status FROM intake_forms WHERE token = $1',
            [token]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Intake form not found'
            });
        }

        const existingForm = checkResult.rows[0];

        if (existingForm.status === 'submitted' || existingForm.status === 'completed') {
            return res.status(400).json({
                success: false,
                error: 'Form already submitted'
            });
        }

        // Build update query dynamically based on provided fields
        const updateFields = [];
        const values = [];
        let paramCount = 1;

        // Map all possible fields (only update what's provided)
        const fieldMapping = {
            // Section 1: Family Information
            parent1FirstName: 'parent1_first_name',
            parent1LastName: 'parent1_last_name',
            parent1Email: 'parent1_email',
            parent1Phone: 'parent1_phone',
            parent1Relationship: 'parent1_relationship',
            parent2FirstName: 'parent2_first_name',
            parent2LastName: 'parent2_last_name',
            parent2Email: 'parent2_email',
            parent2Phone: 'parent2_phone',
            parent2Relationship: 'parent2_relationship',
            streetAddress: 'street_address',
            city: 'city',
            state: 'state',
            zipCode: 'zip_code',
            emergencyContactName: 'emergency_contact_name',
            emergencyContactPhone: 'emergency_contact_phone',
            emergencyContactRelationship: 'emergency_contact_relationship',
            
            // Section 2: Child Information
            childFirstName: 'child_first_name',
            childLastName: 'child_last_name',
            childDob: 'child_dob',
            childAgeYears: 'child_age_years',
            childAgeMonths: 'child_age_months',
            childGender: 'child_gender',
            childEthnicity: 'child_ethnicity',
            childPrimaryLanguage: 'child_primary_language',
            otherLanguagesSpoken: 'other_languages_spoken',
            
            // Section 3: Medical & Developmental History
            pediatricianName: 'pediatrician_name',
            pediatricianPhone: 'pediatrician_phone',
            diagnoses: 'diagnoses',
            diagnosisDate: 'diagnosis_date',
            diagnosingProfessional: 'diagnosing_professional',
            medications: 'medications',
            allergies: 'allergies',
            dietaryRestrictions: 'dietary_restrictions',
            developmentalMilestones: 'developmental_milestones',
            medicalConditions: 'medical_conditions',
            
            // Section 4: Current Services & Therapies
            currentTherapies: 'current_therapies',
            previousTherapies: 'previous_therapies',
            currentSchool: 'current_school',
            schoolPlacement: 'school_placement',
            iep504Plan: 'iep_504_plan',
            
            // Section 5: Ratings
            communicationSkills: 'communication_skills',
            socialSkills: 'social_skills',
            selfCareSkills: 'self_care_skills',
            academicSkills: 'academic_skills',
            playSkills: 'play_skills',
            attentionFocus: 'attention_focus',
            
            // Section 6: Behaviors of Concern
            behaviorsOfConcern: 'behaviors_of_concern',
            
            // Section 7: Strengths & Goals
            childStrengths: 'child_strengths',
            childInterests: 'child_interests',
            parentGoals: 'parent_goals',
            parentConcerns: 'parent_concerns',
            
            // Section 8: Logistics
            preferredStartDate: 'preferred_start_date',
            preferredSchedule: 'preferred_schedule',
            transportationNeeds: 'transportation_needs',
            schedulingConstraints: 'scheduling_constraints',
            
            // Section 9: Insurance & Funding
            hasInsurance: 'has_insurance',
            insuranceProvider: 'insurance_provider',
            insurancePolicyNumber: 'insurance_policy_number',
            insuranceGroupNumber: 'insurance_group_number',
            policyHolderName: 'policy_holder_name',
            policyHolderRelationship: 'policy_holder_relationship',
            medicaidNumber: 'medicaid_number',
            otherFundingSources: 'other_funding_sources',
            
            // Section 10: Consent & Signature
            consentToEvaluate: 'consent_to_evaluate',
            consentToShareRecords: 'consent_to_share_records',
            consentToPhotograph: 'consent_to_photograph',
            parentSignatureData: 'parent_signature_data',
            signatureDate: 'signature_date',
            
            // Status
            status: 'status'
        };

        for (const [key, dbField] of Object.entries(fieldMapping)) {
            if (formData[key] !== undefined) {
                updateFields.push(`${dbField} = $${paramCount}`);
                values.push(formData[key]);
                paramCount++;
            }
        }

        // If submitting, set submitted_at
        if (formData.status === 'submitted') {
            updateFields.push(`submitted_at = CURRENT_TIMESTAMP`);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        // Add token to values
        values.push(token);

        const updateQuery = `
            UPDATE intake_forms 
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE token = $${paramCount}
            RETURNING *
        `;

        const result = await query(updateQuery, values);
        const updatedForm = result.rows[0];

        res.json({
            success: true,
            message: formData.status === 'submitted' ? 'Intake form submitted successfully' : 'Progress saved',
            data: { intakeForm: updatedForm }
        });
    } catch (error) {
        console.error('Update intake form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update intake form',
            message: error.message
        });
    }
});

module.exports = router;
