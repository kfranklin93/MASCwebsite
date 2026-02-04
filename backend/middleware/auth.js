// ================================================================
// AUTHENTICATION MIDDLEWARE
// JWT token verification and user authorization
// ================================================================

const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

/**
 * Generate JWT token for user
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
};

/**
 * Verify JWT token middleware
 */
const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required',
                message: 'No authentication token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if user still exists and is active
        const result = await query(
            'SELECT id, email, first_name, last_name, role, is_active FROM admin_users WHERE id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'User not found',
                message: 'Invalid authentication token'
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                error: 'Account disabled',
                message: 'Your account has been deactivated'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token',
                message: 'Authentication token is invalid'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired',
                message: 'Authentication token has expired'
            });
        }
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error: 'Authentication failed',
            message: 'An error occurred during authentication'
        });
    }
};

/**
 * Check if user has required role
 */
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Not authenticated',
                message: 'You must be logged in to access this resource'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions',
                message: `Access restricted to: ${roles.join(', ')}`
            });
        }

        next();
    };
};

/**
 * Optional authentication - attach user if token present, but don't require it
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            const result = await query(
                'SELECT id, email, first_name, last_name, role FROM admin_users WHERE id = $1 AND is_active = true',
                [decoded.id]
            );
            if (result.rows.length > 0) {
                req.user = result.rows[0];
            }
        }
    } catch (error) {
        // Silent fail for optional auth
        console.log('Optional auth failed, continuing as anonymous');
    }
    next();
};

module.exports = {
    generateToken,
    authenticateToken,
    authorizeRole,
    optionalAuth,
    JWT_SECRET,
    JWT_EXPIRY
};
