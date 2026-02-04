// ================================================================
// SENDGRID EMAIL CONFIGURATION
// Email service setup and utilities
// ================================================================

const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@mommyangelsspecialtycare.com';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Mommy Angels Specialty Care';

/**
 * Send email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content (optional)
 * @returns {Promise} SendGrid response
 */
const sendEmail = async ({ to, subject, html, text }) => {
    try {
        const msg = {
            to,
            from: {
                email: FROM_EMAIL,
                name: FROM_NAME
            },
            subject,
            html,
            text: text || stripHtml(html),
            trackingSettings: {
                clickTracking: { enable: true },
                openTracking: { enable: true }
            }
        };

        const response = await sgMail.send(msg);
        console.log('✅ Email sent successfully to:', to);
        return {
            success: true,
            messageId: response[0].headers['x-message-id'],
            statusCode: response[0].statusCode
        };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        if (error.response) {
            console.error('SendGrid error response:', error.response.body);
        }
        throw error;
    }
};

/**
 * Send bulk emails (with personalization)
 * @param {Array} emails - Array of email objects
 */
const sendBulkEmails = async (emails) => {
    try {
        const messages = emails.map(email => ({
            to: email.to,
            from: {
                email: FROM_EMAIL,
                name: FROM_NAME
            },
            subject: email.subject,
            html: email.html,
            text: email.text || stripHtml(email.html)
        }));

        const response = await sgMail.send(messages);
        console.log(`✅ Sent ${messages.length} emails successfully`);
        return { success: true, count: messages.length };
    } catch (error) {
        console.error('❌ Error sending bulk emails:', error);
        throw error;
    }
};

/**
 * Simple HTML stripper for plain text fallback
 */
const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

/**
 * Verify SendGrid API key
 */
const verifySendGridConnection = async () => {
    try {
        // SendGrid doesn't have a direct "verify" endpoint, so we'll just check if the API key is set
        if (!process.env.SENDGRID_API_KEY) {
            console.warn('⚠️ SendGrid API key not configured');
            return false;
        }
        console.log('✅ SendGrid configured');
        return true;
    } catch (error) {
        console.error('❌ SendGrid verification failed:', error);
        return false;
    }
};

module.exports = {
    sendEmail,
    sendBulkEmails,
    verifySendGridConnection,
    FROM_EMAIL,
    FROM_NAME
};
