// ================================================================
// EMPLOYEE ROUTES
// Employee document upload and management
// ================================================================

const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { uploadEmployeeDocument, getSignedUrl } = require('../config/s3');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

/**
 * @route   GET /api/employee/:token
 * @desc    Get employee info by token (for upload portal)
 * @access  Public
 */
router.get('/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const result = await query(
            `SELECT id, first_name, last_name, email, position, status 
             FROM employees WHERE token = $1`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found',
                message: 'Invalid upload link'
            });
        }

        const employee = result.rows[0];

        // Get uploaded documents
        const docsResult = await query(
            `SELECT id, document_type, file_name, expiration_date, status, uploaded_at
             FROM employee_documents
             WHERE employee_id = $1
             ORDER BY uploaded_at DESC`,
            [employee.id]
        );

        res.json({
            success: true,
            data: {
                employee,
                documents: docsResult.rows
            }
        });
    } catch (error) {
        console.error('Get employee error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve employee data'
        });
    }
});

/**
 * @route   POST /api/employee/upload/:token
 * @desc    Upload employee document
 * @access  Public (token-based)
 */
router.post('/upload/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Verify employee exists
        const empResult = await query(
            'SELECT id FROM employees WHERE token = $1',
            [token]
        );

        if (empResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Invalid upload link'
            });
        }

        const employeeId = empResult.rows[0].id;

        // Set employeeId in body for multer to use
        req.body.employeeId = employeeId;

        // Use multer middleware
        uploadEmployeeDocument.single('file')(req, res, async (err) => {
            if (err) {
                console.error('Upload error:', err);
                return res.status(400).json({
                    success: false,
                    error: err.message || 'File upload failed'
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: 'No file provided'
                });
            }

            try {
                const { documentType, expirationDate } = req.body;

                // Insert document record
                const result = await query(
                    `INSERT INTO employee_documents 
                     (employee_id, document_type, file_name, file_url, file_size, mime_type, expiration_date, status)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                     RETURNING *`,
                    [
                        employeeId,
                        documentType,
                        req.file.originalname,
                        req.file.location, // S3 URL
                        req.file.size,
                        req.file.mimetype,
                        expirationDate || null,
                        'pending'
                    ]
                );

                const document = result.rows[0];

                // Update employee status if this is their first upload
                await query(
                    `UPDATE employees 
                     SET status = 'documents_uploaded', updated_at = CURRENT_TIMESTAMP
                     WHERE id = $1 AND status = 'pending'`,
                    [employeeId]
                );

                res.status(201).json({
                    success: true,
                    message: 'Document uploaded successfully',
                    data: { document }
                });
            } catch (dbError) {
                console.error('Database error after upload:', dbError);
                res.status(500).json({
                    success: false,
                    error: 'Failed to save document record'
                });
            }
        });
    } catch (error) {
        console.error('Employee upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Upload failed'
        });
    }
});

/**
 * @route   GET /api/employee/document/:documentId/download
 * @desc    Get pre-signed URL for document download
 * @access  Public with token or Admin
 */
router.get('/document/:documentId/download', optionalAuth, async (req, res) => {
    try {
        const { documentId } = req.params;
        const { token } = req.query;

        // Get document
        const result = await query(
            `SELECT ed.*, e.token as employee_token
             FROM employee_documents ed
             JOIN employees e ON ed.employee_id = e.id
             WHERE ed.id = $1`,
            [documentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        const document = result.rows[0];

        // Verify authorization
        const isAuthorized = req.user || (token && token === document.employee_token);

        if (!isAuthorized) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized access'
            });
        }

        // Extract S3 key from URL
        const url = new URL(document.file_url);
        const s3Key = url.pathname.substring(1); // Remove leading slash

        // Generate pre-signed URL
        const signedUrl = getSignedUrl(s3Key, 3600); // 1 hour expiry

        res.json({
            success: true,
            data: {
                downloadUrl: signedUrl,
                fileName: document.file_name,
                expiresIn: 3600
            }
        });
    } catch (error) {
        console.error('Document download error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate download link'
        });
    }
});

module.exports = router;
