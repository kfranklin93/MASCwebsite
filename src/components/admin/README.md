# Admin Portal Documentation

## 🔐 Review Portal Access

**URL:** `/admin/careers`  
**Default PIN:** `1234` (change in `.env` file)

## 🎯 Purpose

The Review Portal provides administrators with a centralized dashboard to manage career applications submitted through the Careers page.

## 🚀 Quick Start

1. Navigate to `http://yourdomain.com/admin/careers`
2. Enter your 4-digit PIN
3. Access the dashboard

## 📋 Features

### Authentication
- **PIN-based login** (4-digit code)
- **Session persistence** (stays logged in during browser session)
- **Secure logout** (clears session data)

### Dashboard Components

#### 1. Email Notifications Card
- Direct link to Gmail/email inbox
- Instructions for checking application emails
- All submissions are sent via Formspree to your registered email

#### 2. Formspree Dashboard Card
- Quick access to Formspree dashboard
- View all submissions in one place
- Download attached PDFs
- Manage form settings

#### 3. Review Instructions Card
- Step-by-step guide for reviewing applications
- Best practices for application management
- Tips for organizing submissions

#### 4. Management Best Practices Card
- Compliance guidelines
- Communication templates
- Record retention recommendations

## 🔧 Configuration

### Changing the Admin PIN

1. Open `.env` file in project root
2. Update `REACT_APP_ADMIN_PIN=1234` to your desired PIN
3. Save and restart the development server
4. **Important:** Keep this PIN secure and don't commit to version control

### Adding Multiple Admins

Currently, the portal uses a single shared PIN. For multiple admins:

**Option 1: Share the PIN** (Current Implementation)
- Share the PIN securely with authorized staff
- All admins use the same credentials

**Option 2: Implement User Accounts** (Future Enhancement)
- Requires database integration
- Individual usernames and passwords
- Role-based access control

## 📧 Email Workflow

### How It Works

1. **Applicant submits form** → Formspree receives submission
2. **Formspree sends email** → Your registered email receives notification
3. **Email contains:**
   - Applicant name
   - Applicant email
   - Attached PDF application
4. **Admin reviews** → Download PDF and review qualifications
5. **Admin responds** → Reply directly to applicant's email

### Email Organization Tips

**Create Folders:**
- New Applications
- Under Review
- Interview Scheduled
- Hired
- Not Selected

**Set Up Filters:**
- Auto-label emails from Formspree
- Mark as important
- Never send to spam

## 🔒 Security Features

### Current Implementation
- PIN stored in environment variable
- Session-based authentication
- No persistent storage of credentials
- Session expires on browser close

### Security Best Practices
1. **Change default PIN immediately**
2. **Use a unique 4-digit code**
3. **Don't share PIN via insecure channels**
4. **Log out when finished**
5. **Don't access from public computers**

### Future Security Enhancements
- OAuth integration (Google, Microsoft)
- Two-factor authentication
- Audit logging
- IP whitelisting
- Rate limiting

## 🛠️ Troubleshooting

### Can't Log In

**Problem:** PIN not working
- **Solution:** Verify PIN in `.env` matches what you're entering
- Check for typos in `.env` file
- Restart development server after changing `.env`

**Problem:** Session expires immediately
- **Solution:** Check browser settings (cookies/sessionStorage enabled)
- Try a different browser
- Clear browser cache

### Not Receiving Emails

**Problem:** No email notifications
- **Solution:** Check Formspree notification settings
- Verify email address is correct
- Check spam/junk folder
- Ensure Formspree account is active

### Dashboard Not Loading

**Problem:** Blank page or errors
- **Solution:** Check browser console for errors
- Verify all dependencies are installed
- Clear browser cache
- Try incognito/private mode

## 📊 Application Management Workflow

### Recommended Process

```
1. Receive Email Notification
   ↓
2. Download PDF Application
   ↓
3. Review Qualifications
   ↓
4. Move Email to Appropriate Folder
   ↓
5. Respond to Applicant (within 5-7 days)
   ↓
6. Schedule Interview (if qualified)
   ↓
7. Update Tracking Spreadsheet
```

### Tracking Spreadsheet Template

| Name | Email | Date Applied | Status | Interview Date | Notes |
|------|-------|--------------|--------|----------------|-------|
| John Doe | john@email.com | 2024-01-15 | Under Review | - | Strong candidate |
| Jane Smith | jane@email.com | 2024-01-14 | Interview | 2024-01-20 | Scheduled |

## 🎨 Customization

### Modifying Dashboard Content

Edit `src/components/admin/ReviewPortal.js` to customize:
- Card content
- Instructions
- Links
- Styling

### Adding New Features

Potential enhancements:
- Application statistics
- Search functionality
- Filtering options
- Export to CSV
- Email templates
- Interview scheduling

## 📞 Support

### Getting Help

**Technical Issues:**
- Check browser console for errors
- Review this documentation
- Test in different browsers

**Formspree Issues:**
- Visit [Formspree Help Center](https://help.formspree.io)
- Contact Formspree support

**Feature Requests:**
- Document desired features
- Consider hiring a developer for custom enhancements

## 🚀 Deployment Notes

### Before Going Live

- [ ] Change default PIN
- [ ] Test login functionality
- [ ] Verify email notifications work
- [ ] Test on production domain
- [ ] Train staff on portal usage
- [ ] Document PIN securely
- [ ] Set up email filters

### Production Considerations

1. **Environment Variables**
   - Use production-specific `.env` file
   - Never commit `.env` to version control
   - Use secure deployment practices

2. **Access Control**
   - Limit who has the PIN
   - Consider IP restrictions
   - Monitor access logs

3. **Backup Plan**
   - Always have email access as backup
   - Document Formspree dashboard access
   - Keep admin credentials secure

## 📝 Change Log

### Version 1.0.0 (Initial Release)
- PIN-based authentication
- Email workflow dashboard
- Quick links to email and Formspree
- Application management instructions
- Session persistence
- Responsive design

### Future Versions
- User account system
- Application statistics
- Advanced filtering
- Email integration
- Interview scheduling
- Applicant tracking system

---

**Last Updated:** 2024  
**Maintained By:** Development Team  
**Questions?** Refer to main setup guide: `CAREERS_SETUP.md`