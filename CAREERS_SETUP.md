# Careers Portal Setup Guide

## 🎯 Overview

This guide will help you complete the setup of the Careers portal for Mommy Angels Specialty Care. The portal includes:

- **Public Careers Page**: Accessible at `/careers` and as a section on the home page (`#careers`)
- **Application Form**: With PDF upload functionality
- **Admin Review Portal**: Protected dashboard at `/admin/careers`

---

## 📋 Prerequisites

- Node.js and npm installed
- Formspree account (free tier is sufficient)
- Access to your email for receiving applications

---

## 🚀 Setup Instructions

### Step 1: Create a New Formspree Form

1. **Log in to Formspree**
   - Go to [https://formspree.io](https://formspree.io)
   - Sign in to your account

2. **Create New Form**
   - Click "New Form" or "+" button
   - Name it: "Career Applications"
   - Click "Create Form"

3. **Copy Form ID**
   - After creation, you'll see a form ID (e.g., `xkgjkjng`)
   - Copy this ID - you'll need it in the next step

4. **Configure Form Settings**
   - Go to form settings
   - Enable file uploads (should be enabled by default)
   - Set maximum file size to 10MB
   - Add your email address for notifications

### Step 2: Update Environment Variables

1. **Open `.env` file** in the root directory

2. **Update the Formspree Form ID**
   ```env
   REACT_APP_ADMIN_PIN=1234
   REACT_APP_CAREERS_FORM_ID=YOUR_ACTUAL_FORM_ID_HERE
   ```
   Replace `YOUR_ACTUAL_FORM_ID_HERE` with the form ID you copied from Formspree

3. **Optional: Change Admin PIN**
   - Default PIN is `1234`
   - Change to a more secure 4-digit PIN if desired
   - Keep this PIN confidential

4. **Save the file**

### Step 3: Install Dependencies (if needed)

The required packages should already be installed, but if you encounter issues:

```bash
npm install @formspree/react react-icons
```

### Step 4: Test the Application

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Test the Careers Page**
   - Navigate to `http://localhost:3000/careers`
   - Or scroll to the Careers section on the home page
   - Verify the page loads correctly

3. **Test Form Submission**
   - Download the application PDF
   - Fill in the form fields
   - Upload a test PDF file
   - Submit the form
   - Check your email for the submission

4. **Test Admin Portal**
   - Navigate to `http://localhost:3000/admin/careers`
   - Enter the PIN (default: `1234`)
   - Verify you can access the dashboard

---

## 📧 Email Notification Setup

### Configure Formspree Email Notifications

1. **Go to Form Settings** in Formspree dashboard
2. **Navigate to "Notifications" tab**
3. **Add Email Address**
   - Enter the email where you want to receive applications
   - You can add multiple email addresses
4. **Customize Email Template** (optional)
   - Subject: "New Career Application - [name]"
   - Include applicant name and email in notification
5. **Save Settings**

### Set Up Email Filters (Recommended)

To keep applications organized:

**Gmail:**
1. Create a filter for emails from `noreply@formspree.io`
2. Add label: "Career Applications"
3. Mark as important
4. Never send to spam

**Outlook:**
1. Create a rule for emails from Formspree
2. Move to folder: "Career Applications"
3. Mark as important

---

## 🔐 Security Considerations

### Admin PIN Security

1. **Change Default PIN**
   - The default PIN `1234` should be changed
   - Use a unique 4-digit code
   - Store it securely (password manager recommended)

2. **Environment Variables**
   - Never commit `.env` file to version control
   - `.env` is already in `.gitignore`
   - Share PIN securely with authorized staff only

3. **Session Management**
   - Admin sessions are stored in browser sessionStorage
   - Sessions expire when browser is closed
   - No persistent login for security

### Future Security Enhancements

For production, consider:
- Implementing OAuth authentication
- Adding rate limiting
- Using environment-specific configurations
- Implementing audit logs

---

## 📱 Features Overview

### Public Careers Page

**Location:** `/careers` or `#careers` on home page

**Features:**
- Download Employee Application PDF
- Submit completed application
- Upload PDF files only (max 10MB)
- Form validation
- Success/error messaging
- Fully responsive design

**Form Fields:**
- Full Name (required)
- Email Address (required, validated)
- Application PDF Upload (required, PDF only)

### Admin Review Portal

**Location:** `/admin/careers`

**Features:**
- PIN authentication (4-digit)
- Session persistence
- Email workflow instructions
- Quick links to:
  - Email inbox
  - Formspree dashboard
- Application management best practices
- Logout functionality

**Access:**
- Protected route
- Requires PIN authentication
- Session-based access

---

## 🎨 Customization

### Styling

All components use your existing UI patterns:
- Typography from `src/components/ui/Typography.js`
- Buttons from `src/components/ui/Button.js`
- Forms from `src/components/ui/Form.js`
- Consistent color scheme (Red: #CD1B1B, Blue: #4A90E2)

### Content Updates

To update content, edit:
- **Careers Component**: `src/components/Careers.js`
- **Review Portal**: `src/components/admin/ReviewPortal.js`

---

## 🔧 Troubleshooting

### Form Submission Issues

**Problem:** Form doesn't submit
- **Solution:** Verify Formspree form ID in `.env` is correct
- Check browser console for errors
- Ensure file is PDF format and under 10MB

**Problem:** Not receiving email notifications
- **Solution:** Check Formspree notification settings
- Verify email address is correct
- Check spam folder
- Ensure Formspree account is active

### Admin Portal Issues

**Problem:** Can't log in with PIN
- **Solution:** Verify PIN in `.env` matches what you're entering
- Clear browser cache and sessionStorage
- Check browser console for errors

**Problem:** Session expires too quickly
- **Solution:** Session uses sessionStorage (expires on browser close)
- This is intentional for security
- Consider implementing localStorage for longer sessions if needed

### File Upload Issues

**Problem:** PDF upload fails
- **Solution:** Ensure file is actually PDF format
- Check file size (must be under 10MB)
- Verify Formspree plan supports file uploads
- Check browser console for specific errors

---

## 📊 Application Management Workflow

### Recommended Process

1. **Receive Application**
   - Email notification arrives
   - Contains applicant name and email
   - PDF attachment included

2. **Review Application**
   - Download PDF from email
   - Review qualifications
   - Check references

3. **Organize Applications**
   - Create email folders:
     - "New Applications"
     - "Under Review"
     - "Interview Scheduled"
     - "Hired"
     - "Not Selected"

4. **Respond to Applicants**
   - Reply within 5-7 business days
   - Use professional email templates
   - Schedule interviews for qualified candidates

5. **Track Applications**
   - Maintain spreadsheet with:
     - Applicant name
     - Application date
     - Current status
     - Interview date (if applicable)
     - Decision date

---

## 🚀 Deployment

### Before Deploying to Production

1. **Update Environment Variables**
   - Set production Formspree form ID
   - Change admin PIN to secure value
   - Verify all environment variables

2. **Test Thoroughly**
   - Test form submission
   - Test file uploads
   - Test admin authentication
   - Test on mobile devices

3. **Configure Production Email**
   - Set up professional email for notifications
   - Configure email filters
   - Test email delivery

4. **Update Documentation**
   - Document admin PIN (securely)
   - Share access instructions with team
   - Create training materials if needed

### Deployment Checklist

- [ ] Formspree form created and configured
- [ ] Environment variables updated
- [ ] Admin PIN changed from default
- [ ] Email notifications tested
- [ ] Form submission tested
- [ ] Admin portal tested
- [ ] Mobile responsiveness verified
- [ ] PDF download link works
- [ ] File upload restrictions work
- [ ] Success/error messages display correctly

---

## 📞 Support

### Getting Help

**Formspree Issues:**
- Documentation: [https://help.formspree.io](https://help.formspree.io)
- Support: [https://formspree.io/support](https://formspree.io/support)

**Technical Issues:**
- Check browser console for errors
- Review this documentation
- Test in different browsers
- Clear cache and try again

### Common Questions

**Q: Can I use a different form service instead of Formspree?**
A: Yes, but you'll need to modify the form submission logic in `Careers.js`

**Q: Can multiple admins access the portal?**
A: Yes, share the PIN with authorized staff. For individual accounts, consider implementing a more robust authentication system.

**Q: How do I upgrade to Formspree paid plan?**
A: Visit Formspree dashboard and upgrade. Paid plans offer API access for more advanced features.

**Q: Can I customize the application PDF?**
A: Yes, replace the file at `/public/assets//Employee_Application_Fixed.pdf` with your custom PDF.

---

## 🎉 You're All Set!

Your Careers portal is now ready to accept applications. Remember to:

1. ✅ Update the Formspree form ID in `.env`
2. ✅ Change the default admin PIN
3. ✅ Test the entire workflow
4. ✅ Set up email notifications
5. ✅ Train staff on using the admin portal

For any questions or issues, refer back to this guide or check the troubleshooting section.

**Good luck with your hiring process!** 🚀