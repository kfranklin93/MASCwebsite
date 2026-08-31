// ================================================================
// AUTHENTICATION ROUTES
// Login, logout, token refresh
// ================================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../config/database');
const { generateToken, authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

/**
 * @route   POST /api/auth/login
 * @desc    Admin user login
 * @access  Public
 */
router.post('/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty()
    ],
    async (req, res) => {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors.array()
                });
            }

            const { email, password } = req.body;

            // Find user
            const result = await query(
                'SELECT * FROM admin_users WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials',
                    message: 'Email or password is incorrect'
                });
            }

            const user = result.rows[0];

            // Check if account is active
            if (!user.is_active) {
                return res.status(403).json({
                    success: false,
                    error: 'Account disabled',
                    message: 'Your account has been deactivated. Please contact administration.'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials',
                    message: 'Email or password is incorrect'
                });
            }

            // Generate JWT token
            const token = generateToken(user);

            // Log successful login
            await query(
                `INSERT INTO audit_logs (user_id, action, table_name, ip_address, user_agent)
                 VALUES ($1, $2, $3, $4, $5)`,
                [user.id, 'login', 'admin_users', req.ip, req.get('user-agent')]
            );

            // Return user data and token (exclude password)
            const { password_hash, ...userData } = user;

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: userData,
                    token
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                error: 'Login failed',
                message: 'An error occurred during login'
            });
        }
    }
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */
router.get('/me', authenticateToken, async (req, res) => {
    try {
        res.json({
            success: true,
            data: { user: req.user }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get user data'
        });
    }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (log action)
 * @access  Private
 */
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Log logout action
        await query(
            `INSERT INTO audit_logs (user_id, action, table_name, ip_address, user_agent)
             VALUES ($1, $2, $3, $4, $5)`,
            [req.user.id, 'logout', 'admin_users', req.ip, req.get('user-agent')]
        );

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Logout failed'
        });
    }
});

/**
 * @route   POST /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post('/change-password',
    authenticateToken,
    [
        body('currentPassword').notEmpty(),
        body('newPassword').isLength({ min: 8 })
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

            const { currentPassword, newPassword } = req.body;

            // Get current password hash
            const result = await query(
                'SELECT password_hash FROM admin_users WHERE id = $1',
                [req.user.id]
            );

            const user = result.rows[0];

            // Verify current password
            const isValid = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isValid) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid password',
                    message: 'Current password is incorrect'
                });
            }

            // Hash new password
            const newPasswordHash = await bcrypt.hash(newPassword, 10);

            // Update password
            await query(
                'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                [newPasswordHash, req.user.id]
            );

            // Log password change
            await query(
                `INSERT INTO audit_logs (user_id, action, table_name, ip_address, user_agent)
                 VALUES ($1, $2, $3, $4, $5)`,
                [req.user.id, 'password_change', 'admin_users', req.ip, req.get('user-agent')]
            );

            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (error) {
            console.error('Password change error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to change password'
            });
        }
    }
);

module.exports = router;
