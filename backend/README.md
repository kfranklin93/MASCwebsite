# Mommy Angels Specialty Care - Backend API

Complete backend system for client intake automation and employee onboarding for an ABA therapy and daycare center.

## 🚀 Features

### Client Intake System
- ✅ Contact form submissions with auto-confirmation emails
- ✅ Unique intake form links with token-based access
- ✅ 10-section comprehensive intake form
- ✅ Auto-save progress (localStorage on frontend)
- ✅ BCBA eligibility checklist (17 criteria)
- ✅ Automated decision emails (accept/evaluate/waitlist/decline)

### Employee Onboarding
- ✅ Employee document upload portal with unique links
- ✅ AWS S3 file storage with encryption (HIPAA-compliant)
- ✅ Document expiration tracking
- ✅ Automated email alerts (30 days, 7 days, expired)
- ✅ Support for multiple document types

### Admin Dashboard
- ✅ JWT authentication with role-based access
- ✅ Contact and registration management
- ✅ Intake form review interface
- ✅ Employee document management
- ✅ Expiration dashboard with color-coded alerts
- ✅ Audit logging for compliance

## 📋 Prerequisites

- Node.js 16+ and npm
- PostgreSQL 13+
- AWS Account (for S3)
- SendGrid Account (for emails)

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/kfranklin93/MASCwebsite.git
cd MASCwebsite/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Create PostgreSQL database:

```bash
createdb masc_db
```

Run schema:

```bash
psql -d masc_db -f schema.sql
```

**IMPORTANT**: Update default admin passwords after first login!

Default admin accounts (password: `TempPassword123!`):
- owner@mommyangelsspecialtycare.com
- shruthi@mommyangelsspecialtycare.com
- bcba@mommyangelsspecialtycare.com

To hash passwords, use this script:

```javascript
const bcrypt = require('bcrypt');
const password = 'YourNewPassword';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

Then update in database:

```sql
UPDATE admin_users 
SET password_hash = 'your_bcrypt_hash' 
WHERE email = 'owner@mommyangelsspecialtycare.com';
```

### 4. AWS S3 Setup

Create S3 bucket with folder structure:

```
masc-employee-documents/
  └── employees/
      └── {employee_id}/
          ├── application/
          ├── i9/
          ├── ids/
          ├── rbt_certificate/
          ├── cpr_certificate/
          └── others/
```

Enable encryption and versioning for HIPAA compliance:

```bash
aws s3api put-bucket-encryption \
  --bucket masc-employee-documents \
  --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
```

### 5. SendGrid Setup

1. Create SendGrid account
2. Verify sender email: noreply@mommyangelsspecialtycare.com
3. Generate API key with "Mail Send" permissions
4. Add API key to `.env`

### 6. Environment Configuration

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
nano .env
```

Required variables:
- Database credentials
- JWT_SECRET (generate with `openssl rand -base64 32`)
- AWS credentials
- SendGrid API key

## 🎯 Running the Server

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Production

```bash
npm start
```

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/client/contact` | Submit contact form |
| POST | `/api/client/register` | Submit registration |
| GET | `/api/client/intake/:token` | Get intake form |
| PUT | `/api/client/intake/:token` | Update intake form |
| GET | `/api/employee/:token` | Get employee info |
| POST | `/api/employee/upload/:token` | Upload document |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/change-password` | Change password |

### Admin Endpoints (Protected)

**Dashboard**
- GET `/api/admin/dashboard` - Get statistics

**Contacts**
- GET `/api/admin/contacts` - List contacts
- POST `/api/admin/contacts/:id/send-intake` - Send intake form

**Intake Forms**
- GET `/api/admin/intake-forms` - List intake forms
- GET `/api/admin/intake-forms/:id` - Get single form
- POST `/api/admin/intake-forms` - Create manually
- POST `/api/admin/intake-forms/:id/review` - Submit BCBA review

**Employees**
- GET `/api/admin/employees` - List employees
- POST `/api/admin/employees` - Create employee
- PUT `/api/admin/employees/:id` - Update employee
- GET `/api/admin/employees/:id/documents` - Get documents

**Expirations**
- GET `/api/admin/expirations` - List expiring documents
- PUT `/api/admin/documents/:id/expiration` - Update expiration
- POST `/api/admin/documents/:id/send-reminder` - Send reminder

## 🔐 Security Features

- **HIPAA Compliance**
  - Encrypted database connections (SSL)
  - S3 server-side encryption (AES-256)
  - Pre-signed URLs with expiration
  - Audit logging for all actions
  
- **Authentication**
  - JWT tokens with expiration
  - Bcrypt password hashing (10 rounds)
  - Role-based access control
  
- **Data Protection**
  - Input validation on all endpoints
  - SQL injection prevention (parameterized queries)
  - File type validation
  - File size limits (10MB)

## 📊 Database Schema

### Core Tables
- `admin_users` - Admin accounts with roles
- `contacts` - Website contact submissions
- `registrations` - Event registrations
- `intake_forms` - Detailed intake submissions
- `checklist_reviews` - BCBA eligibility reviews
- `employees` - Employee records
- `employee_documents` - Uploaded files
- `email_logs` - Email delivery tracking
- `audit_logs` - System audit trail

### Key Relationships
```
contacts → intake_forms (1:many)
registrations → intake_forms (1:many)
intake_forms → checklist_reviews (1:1)
employees → employee_documents (1:many)
admin_users → audit_logs (1:many)
```

## 📧 Email Templates

All emails are HTML templates with mobile-responsive design:

1. **Contact Confirmation** - Sent after contact form submission
2. **Intake Request** - Unique link to intake form
3. **Acceptance** - Welcome to program
4. **Evaluation Needed** - Schedule assessment
5. **Waitlist** - Added to waitlist
6. **Decline** - Application decision
7. **Employee Welcome** - Document upload link
8. **30-Day Expiration Warning** - Yellow alert
9. **7-Day Expiration Alert** - Orange alert
10. **Expired Document** - Red alert

## 🔄 Automated Jobs

For production, set up cron jobs or use a task scheduler:

### Daily Expiration Checks

```javascript
// utils/checkExpirations.js
const { query } = require('./config/database');
const { sendEmail } = require('./config/email');
const { 
  expirationWarning30Days, 
  expirationCritical7Days, 
  documentExpiredEmail 
} = require('./utils/emailTemplates');

async function checkExpirations() {
  // Get documents expiring in 30 days
  const warning30 = await query(`
    SELECT ed.*, e.first_name, e.last_name, e.email
    FROM employee_documents ed
    JOIN employees e ON ed.employee_id = e.id
    WHERE ed.expiration_date = CURRENT_DATE + INTERVAL '30 days'
  `);

  // Send emails...
}
```

Run with cron:

```bash
0 9 * * * node /path/to/backend/utils/checkExpirations.js
```

## 🧪 Testing

### Manual Testing

Use provided Postman collection or cURL:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@mommyangelsspecialtycare.com","password":"TempPassword123!"}'

# Get dashboard (replace TOKEN)
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer TOKEN"
```

### Automated Testing

```bash
npm test
```

## 📦 Deployment

### Option 1: Traditional Server

1. Set `NODE_ENV=production`
2. Use PM2 for process management:

```bash
npm install -g pm2
pm2 start server.js --name masc-backend
pm2 save
pm2 startup
```

### Option 2: Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Option 3: Cloud Platforms

- **Heroku**: Add Procfile: `web: node server.js`
- **AWS Elastic Beanstalk**: Use Node.js platform
- **Google Cloud Run**: Use Dockerfile
- **Railway**: Connect repo, auto-deploy

## 🐛 Troubleshooting

### Database Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Check PostgreSQL is running and credentials in `.env`

```bash
sudo service postgresql status
sudo service postgresql start
```

### SendGrid Email Not Sending

**Check**:
1. API key is valid
2. Sender email is verified in SendGrid
3. Check SendGrid activity dashboard
4. Review email_logs table

### S3 Upload Failed

**Check**:
1. AWS credentials are correct
2. Bucket name matches `.env`
3. IAM user has `s3:PutObject` permission
4. Bucket region matches `AWS_REGION`

### JWT Token Expired

Frontend should handle this by redirecting to login. Backend returns:

```json
{
  "success": false,
  "error": "Token expired",
  "message": "Authentication token has expired"
}
```

## 📈 Monitoring & Logs

### View Logs

```bash
# Development
npm run dev

# Production with PM2
pm2 logs masc-backend
```

### Database Queries

Check slow queries:

```sql
SELECT * FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

### Audit Trail

All admin actions are logged:

```sql
SELECT 
  au.email,
  al.action,
  al.table_name,
  al.created_at
FROM audit_logs al
JOIN admin_users au ON al.user_id = au.id
ORDER BY al.created_at DESC
LIMIT 50;
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

Proprietary - Mommy Angels Specialty Care

## 📞 Support

For technical support, contact:
- Email: tech@mommyangelsspecialtycare.com
- Phone: (XXX) XXX-XXXX

## 🔮 Future Enhancements

- [ ] AI document classification (GPT-4 Vision)
- [ ] Automated expiration check cron job
- [ ] SMS notifications (Twilio)
- [ ] Electronic signature integration (DocuSign)
- [ ] Parent portal for progress tracking
- [ ] Analytics dashboard
- [ ] Bulk CSV import/export
- [ ] Multi-language support
- [ ] Video upload support
