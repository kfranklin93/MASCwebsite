// ================================================================
// EMAIL TEMPLATES
// HTML email templates for all automated emails
// ================================================================

const WEBSITE_URL = process.env.WEBSITE_URL || 'https://mommyangelsspecialtycare.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@mommyangelsspecialtycare.com';
const PHONE = '(XXX) XXX-XXXX'; // Update with actual phone

// Base email template wrapper
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mommy Angels Specialty Care</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #4A90E2;
        }
        .logo {
            max-width: 200px;
            height: auto;
        }
        .content {
            padding: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #4A90E2;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .highlight {
            background-color: #FFF9E6;
            padding: 15px;
            border-left: 4px solid #FFD700;
            margin: 15px 0;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 style="color: #4A90E2; margin: 0;">Mommy Angels Specialty Care</h1>
            <p style="color: #666; margin: 5px 0;">Where ABA Therapy and Child Care Excellence Come Together</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p><strong>Mommy Angels Specialty Care</strong></p>
            <p>Phone: ${PHONE} | Email: ${ADMIN_EMAIL}</p>
            <p>Website: <a href="${WEBSITE_URL}">${WEBSITE_URL}</a></p>
            <p style="margin-top: 15px; font-size: 11px;">
                This email contains confidential information. If you received this in error, please delete it immediately.
            </p>
        </div>
    </div>
</body>
</html>
`;

// 1. Contact Form Confirmation
const contactConfirmation = (name) => {
    const content = `
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear ${name},</p>
        <p>We've received your inquiry and appreciate your interest in Mommy Angels Specialty Care.</p>
        <p>Our team will review your message and respond within <strong>1-2 business days</strong>.</p>
        <div class="highlight">
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>Our admissions team will review your inquiry</li>
                <li>We'll reach out to schedule an initial consultation</li>
                <li>You may receive an intake form to complete</li>
            </ul>
        </div>
        <p>If you need immediate assistance, please call us at ${PHONE}.</p>
        <p>Warm regards,<br>The Mommy Angels Team</p>
    `;
    return emailWrapper(content);
};

// 2. Intake Form Request
const intakeFormRequest = (parentName, intakeToken) => {
    const intakeUrl = `${WEBSITE_URL}/client-portal/intake/${intakeToken}`;
    const content = `
        <h2>Complete Your Intake Form</h2>
        <p>Dear ${parentName},</p>
        <p>Thank you for your interest in services at Mommy Angels Specialty Care!</p>
        <p>To help us better understand your child's needs, please complete our comprehensive intake form.</p>
        <div class="highlight">
            <p><strong>Important Information:</strong></p>
            <ul>
                <li>The form takes approximately 15-20 minutes to complete</li>
                <li>You can save your progress and return later</li>
                <li>All information is kept strictly confidential</li>
                <li>This link is unique to you and expires in 30 days</li>
            </ul>
        </div>
        <center>
            <a href="${intakeUrl}" class="button">Complete Intake Form</a>
        </center>
        <p>Or copy this link to your browser:<br>
        <a href="${intakeUrl}">${intakeUrl}</a></p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Mommy Angels Admissions Team</p>
    `;
    return emailWrapper(content);
};

// 3. Acceptance Email
const acceptanceEmail = (parentName, childName) => {
    const content = `
        <h2>🎉 Welcome to Mommy Angels Specialty Care!</h2>
        <p>Dear ${parentName},</p>
        <p>We are delighted to inform you that <strong>${childName}</strong> has been accepted into our program!</p>
        <div class="highlight">
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Our admissions coordinator will contact you within 2 business days</li>
                <li>We'll schedule an orientation session</li>
                <li>You'll receive enrollment paperwork to complete</li>
                <li>We'll discuss start dates and scheduling</li>
            </ul>
        </div>
        <p>We're excited to begin this journey with your family and look forward to supporting ${childName}'s growth and development.</p>
        <p>If you have any immediate questions, please reach out to us at ${PHONE}.</p>
        <p>Warm welcome,<br>Mrs. Bolling and the Mommy Angels Team</p>
    `;
    return emailWrapper(content);
};

// 4. Evaluation Needed Email
const evaluationNeededEmail = (parentName, childName) => {
    const content = `
        <h2>Additional Evaluation Required</h2>
        <p>Dear ${parentName},</p>
        <p>Thank you for completing the intake form for <strong>${childName}</strong>.</p>
        <p>Based on our review, we would like to schedule an in-person evaluation to better understand ${childName}'s needs and determine if our program is the right fit.</p>
        <div class="highlight">
            <p><strong>What This Means:</strong></p>
            <ul>
                <li>Our BCBA will conduct a comprehensive assessment</li>
                <li>The evaluation typically takes 1-2 hours</li>
                <li>You'll receive a detailed report with recommendations</li>
                <li>There is no cost for this evaluation</li>
            </ul>
        </div>
        <p>Our team will contact you within 2 business days to schedule the evaluation at a time convenient for you.</p>
        <p>If you have any questions, please contact us at ${PHONE}.</p>
        <p>Best regards,<br>The Mommy Angels Clinical Team</p>
    `;
    return emailWrapper(content);
};

// 5. Waitlist Email
const waitlistEmail = (parentName, childName) => {
    const content = `
        <h2>Added to Our Waitlist</h2>
        <p>Dear ${parentName},</p>
        <p>Thank you for your interest in Mommy Angels Specialty Care for <strong>${childName}</strong>.</p>
        <p>We are currently at full capacity, but we would love to serve your family when space becomes available.</p>
        <div class="highlight">
            <p><strong>What Happens Now:</strong></p>
            <ul>
                <li>${childName} has been added to our priority waitlist</li>
                <li>We'll notify you immediately when a spot opens</li>
                <li>Your position is secured based on submission date</li>
                <li>We typically see openings within 2-4 months</li>
            </ul>
        </div>
        <p>We'll keep you updated on ${childName}'s waitlist status and will reach out as soon as we have availability.</p>
        <p>In the meantime, if you have any questions or if your circumstances change, please contact us at ${PHONE}.</p>
        <p>Thank you for your patience,<br>The Mommy Angels Team</p>
    `;
    return emailWrapper(content);
};

// 6. Decline Email
const declineEmail = (parentName, childName, reason = '') => {
    const content = `
        <h2>Update on Your Application</h2>
        <p>Dear ${parentName},</p>
        <p>Thank you for your interest in Mommy Angels Specialty Care for <strong>${childName}</strong>.</p>
        <p>After careful review of the intake information, we have determined that we may not be the best fit for ${childName}'s current needs at this time.</p>
        ${reason ? `<div class="highlight"><p><strong>Reason:</strong> ${reason}</p></div>` : ''}
        <p>We want to ensure every child in our program receives the specialized care and attention they deserve. We would be happy to provide referrals to other providers who may be better suited to meet ${childName}'s needs.</p>
        <p>Please feel free to contact us at ${PHONE} to discuss alternative resources and recommendations.</p>
        <p>We wish you and your family all the best,<br>The Mommy Angels Team</p>
    `;
    return emailWrapper(content);
};

// 7. Employee Welcome Email
const employeeWelcomeEmail = (employeeName, uploadToken) => {
    const uploadUrl = `${WEBSITE_URL}/employee-portal/upload/${uploadToken}`;
    const content = `
        <h2>Welcome to the Mommy Angels Team!</h2>
        <p>Dear ${employeeName},</p>
        <p>Welcome! We're excited to have you join Mommy Angels Specialty Care.</p>
        <p>To complete your onboarding, please upload the required documents using the secure portal below.</p>
        <div class="highlight">
            <p><strong>Required Documents:</strong></p>
            <ul>
                <li>Completed Application</li>
                <li>I-9 Form with ID copies (front and back)</li>
                <li>RBT Certificate (if applicable)</li>
                <li>CPR/First Aid Certificate</li>
                <li>Background Check Authorization</li>
                <li>Any additional certifications</li>
            </ul>
        </div>
        <center>
            <a href="${uploadUrl}" class="button">Upload Documents</a>
        </center>
        <p>Or copy this link to your browser:<br>
        <a href="${uploadUrl}">${uploadUrl}</a></p>
        <p><strong>Tips:</strong></p>
        <ul>
            <li>You can use your phone to take photos of documents</li>
            <li>Accepted formats: PDF, JPG, PNG (max 10MB each)</li>
            <li>This secure link is unique to you</li>
        </ul>
        <p>If you have any questions, please contact HR at ${ADMIN_EMAIL}.</p>
        <p>Welcome aboard!<br>The Mommy Angels HR Team</p>
    `;
    return emailWrapper(content);
};

// 8. Document Expiration Warning (30 days)
const expirationWarning30Days = (employeeName, documentType, expirationDate) => {
    const content = `
        <h2>Document Expiration Notice</h2>
        <p>Dear ${employeeName},</p>
        <p>This is a friendly reminder that your <strong>${documentType}</strong> will expire on <strong>${expirationDate}</strong> (30 days from now).</p>
        <div class="highlight">
            <p><strong>Action Required:</strong></p>
            <p>Please renew this document and upload the updated version to avoid any interruption in your employment status.</p>
        </div>
        <p>To upload your renewed document, please contact HR at ${ADMIN_EMAIL}.</p>
        <p>Thank you for keeping your credentials up to date!</p>
        <p>Best regards,<br>The Mommy Angels HR Team</p>
    `;
    return emailWrapper(content);
};

// 9. Document Expiration Critical (7 days)
const expirationCritical7Days = (employeeName, documentType, expirationDate) => {
    const content = `
        <h2>⚠️ URGENT: Document Expiring Soon</h2>
        <p>Dear ${employeeName},</p>
        <p><strong>URGENT:</strong> Your <strong>${documentType}</strong> will expire on <strong>${expirationDate}</strong> (7 days from now).</p>
        <div class="highlight" style="background-color: #FFEBEE; border-left-color: #F44336;">
            <p><strong>Immediate Action Required:</strong></p>
            <p>You must renew and upload this document within the next 7 days to maintain your active employment status.</p>
        </div>
        <p>Please contact HR immediately at ${ADMIN_EMAIL} or ${PHONE} to avoid any work interruption.</p>
        <p>Sincerely,<br>The Mommy Angels HR Team</p>
    `;
    return emailWrapper(content);
};

// 10. Document Expired
const documentExpiredEmail = (employeeName, documentType, expirationDate) => {
    const content = `
        <h2>🚨 Document Expired - Immediate Action Required</h2>
        <p>Dear ${employeeName},</p>
        <p><strong>NOTICE:</strong> Your <strong>${documentType}</strong> expired on <strong>${expirationDate}</strong>.</p>
        <div class="highlight" style="background-color: #FFEBEE; border-left-color: #D32F2F;">
            <p><strong>Your employment status may be affected until this is resolved.</strong></p>
            <p>Please contact HR immediately to upload your renewed document or discuss your status.</p>
        </div>
        <p><strong>Contact HR Now:</strong></p>
        <ul>
            <li>Email: ${ADMIN_EMAIL}</li>
            <li>Phone: ${PHONE}</li>
        </ul>
        <p>This is a compliance requirement and must be addressed immediately.</p>
        <p>Sincerely,<br>The Mommy Angels HR Team</p>
    `;
    return emailWrapper(content);
};

module.exports = {
    contactConfirmation,
    intakeFormRequest,
    acceptanceEmail,
    evaluationNeededEmail,
    waitlistEmail,
    declineEmail,
    employeeWelcomeEmail,
    expirationWarning30Days,
    expirationCritical7Days,
    documentExpiredEmail
};
