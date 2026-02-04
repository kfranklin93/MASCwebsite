# 🔑 TOKEN GENERATION GUIDE
## How to Get Tokens for Client Intake & Employee Document Upload

---

## 📋 TABLE OF CONTENTS
1. [Client Intake Tokens](#client-intake-tokens)
2. [Employee Document Upload Tokens](#employee-document-upload-tokens)
3. [Quick Test Commands](#quick-test-commands)
4. [Manual Database Methods](#manual-database-methods)
5. [Production Workflow](#production-workflow)

---

## 🎯 CLIENT INTAKE TOKENS

### Method 1: Through Admin Dashboard (RECOMMENDED)

This is how it works in production - the admin sends intake forms to clients.

#### Steps:

1. **Login to Admin Dashboard**
   ```
   http://localhost:3000/admin/login
   Email: owner@mommyangelsspecialtycare.com
   Password: TempPassword123!
   ```

2. **Navigate to Registrations**
   ```
   http://localhost:3000/admin/registrations
   ```

3. **Find a Contact**
   - See list of all client contacts
   - Click **"View Details"** on any contact

4. **Send Intake Form**
   - In the modal, click **"Send Intake Form"** button
   - This automatically:
     - ✅ Generates a unique UUID token
     - ✅ Creates intake form in database
     - ✅ Sends email to client with the link
     - ✅ Updates contact status to "intake_sent"

5. **Get the Token**
   - The token is in the database `intake_forms` table
   - The email sent to client contains: 
     ```
     http://your-domain.com/client-portal/intake/[TOKEN-HERE]
     ```

---

### Method 2: Use Helper Script (FOR TESTING)

We created a helper script that automatically generates test tokens!

#### Run the Script:

```bash
# Make sure backend is running or database is accessible
cd /Users/kenanfranklin/Sites/MASCwebsite/backend

# Run the helper script
node scripts/create-test-intake-token.js
```

#### What it does:
- ✅ Looks for existing contacts in database
- ✅ Creates a new intake form record
- ✅ Generates a unique UUID token
- ✅ Displays the token and full URL
- ✅ Ready to test immediately!

#### Example Output:
```
✅ Test intake form created successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INTAKE FORM DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Token:        550e8400-e29b-41d4-a716-446655440000
   Contact ID:   1
   Parent Name:  John Doe
   Email:        john.doe@example.com
   Status:       sent
   Created:      2024-02-04 15:30:00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 TEST INTAKE FORM URL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   http://localhost:3000/client-portal/intake/550e8400-e29b-41d4-a716-446655440000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Copy the URL above and paste it in your browser to test the intake form!
```

#### Prerequisites:
- Database must have at least one contact
- If no contacts exist, script will tell you how to create one

---

### Method 3: Manual Database Query (ADVANCED)

If you prefer using SQL directly:

```bash
# Connect to database
psql -d masc_db

# Check existing contacts
SELECT id, first_name, last_name, email FROM contacts ORDER BY created_at DESC LIMIT 5;

# Create intake form with token
INSERT INTO intake_forms (
  token, 
  contact_id, 
  status, 
  parent1_first_name, 
  parent1_last_name, 
  parent1_email, 
  parent1_phone
)
VALUES (
  gen_random_uuid(),  -- PostgreSQL UUID generator
  1,                   -- Replace with actual contact_id
  'sent',
  'John',
  'Doe',
  'john.doe@example.com',
  '555-1234'
)
RETURNING token;

# The returned token is your intake form token!
```

Then use the token:
```
http://localhost:3000/client-portal/intake/[TOKEN-FROM-ABOVE]
```

---

## 👤 EMPLOYEE DOCUMENT UPLOAD TOKENS

### Method 1: Through Admin Dashboard (RECOMMENDED)

#### Steps:

1. **Login to Admin Dashboard**
   ```
   http://localhost:3000/admin/login
   ```

2. **Navigate to Employees Page**
   ```
   http://localhost:3000/admin/employees
   ```

3. **Add New Employee**
   - Click **"Add New Employee"** button
   - Fill out form:
     - First Name
     - Last Name
     - Email
     - Phone
     - Position (RBT, BCBA, Admin, etc.)
   - Submit form

4. **Token Auto-Generated**
   - System automatically generates unique upload token
   - Sends welcome email with upload link to employee
   - Email contains:
     ```
     http://your-domain.com/employee-portal/upload/[TOKEN-HERE]
     ```

5. **View Token**
   - Check employee details in dashboard
   - Upload token is stored in `employees.upload_token` column

---

### Method 2: Use Helper Script (FOR TESTING)

#### Run the Script:

```bash
cd /Users/kenanfranklin/Sites/MASCwebsite/backend

# Run the helper script
node scripts/create-test-employee-token.js
```

#### What it does:
- ✅ Looks for existing employees
- ✅ If none found, creates a test employee
- ✅ Generates upload token (or shows existing one)
- ✅ Displays the full upload URL
- ✅ Ready to test immediately!

#### Example Output:
```
✅ Test employee created successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 EMPLOYEE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   ID:           1
   Name:         Test Employee
   Email:        test.employee@example.com
   Position:     RBT
   Token:        a3b5c7d9-e1f3-4a5b-9c7d-123456789abc
   Status:       pending
   Created:      2024-02-04 15:35:00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 EMPLOYEE DOCUMENT UPLOAD URL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   http://localhost:3000/employee-portal/upload/a3b5c7d9-e1f3-4a5b-9c7d-123456789abc

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Copy the URL above and paste it in your browser to test document upload!
```

---

### Method 3: Manual Database Query (ADVANCED)

```bash
# Connect to database
psql -d masc_db

# Check existing employees
SELECT id, first_name, last_name, email, upload_token FROM employees ORDER BY created_at DESC LIMIT 5;

# Option A: Create new employee with token
INSERT INTO employees (
  first_name,
  last_name,
  email,
  phone,
  position,
  upload_token,
  status
)
VALUES (
  'Test',
  'Employee',
  'test@example.com',
  '555-1234',
  'RBT',
  gen_random_uuid(),  -- Auto-generate token
  'pending'
)
RETURNING id, upload_token;

# Option B: Add token to existing employee
UPDATE employees 
SET upload_token = gen_random_uuid()
WHERE id = 1  -- Replace with actual employee ID
RETURNING upload_token;
```

Then use the token:
```
http://localhost:3000/employee-portal/upload/[TOKEN-FROM-ABOVE]
```

---

## ⚡ QUICK TEST COMMANDS

### Complete Test Workflow (Copy & Paste)

```bash
# 1. Start backend (if not running)
cd /Users/kenanfranklin/Sites/MASCwebsite/backend
npm run dev

# 2. In another terminal, generate intake token
cd /Users/kenanfranklin/Sites/MASCwebsite/backend
node scripts/create-test-intake-token.js

# 3. Copy the URL from output and test in browser

# 4. Generate employee token
node scripts/create-test-employee-token.js

# 5. Copy the URL from output and test in browser
```

---

## 📊 MANUAL DATABASE METHODS

### Check All Intake Tokens

```sql
-- See all intake forms with tokens
SELECT 
  if.token,
  if.status,
  c.first_name || ' ' || c.last_name as parent_name,
  c.email,
  if.created_at,
  if.updated_at
FROM intake_forms if
JOIN contacts c ON c.id = if.contact_id
ORDER BY if.created_at DESC;
```

### Check All Employee Tokens

```sql
-- See all employees with upload tokens
SELECT 
  id,
  first_name || ' ' || last_name as employee_name,
  email,
  position,
  upload_token,
  status,
  created_at
FROM employees
WHERE upload_token IS NOT NULL
ORDER BY created_at DESC;
```

### Generate Quick Test Token

```sql
-- Generate a UUID to use as test token
SELECT gen_random_uuid();

-- Example result: 550e8400-e29b-41d4-a716-446655440000
-- Use it directly: http://localhost:3000/client-portal/intake/550e8400-e29b-41d4-a716-446655440000
```

---

## 🏭 PRODUCTION WORKFLOW

### Client Intake Flow (Production)

```mermaid
1. Client submits registration form
   ↓
2. Contact saved to database
   ↓
3. Admin reviews in Registrations page
   ↓
4. Admin clicks "Send Intake Form"
   ↓
5. System generates unique token
   ↓
6. Email sent to client with link
   ↓
7. Client clicks link and fills intake
   ↓
8. Data auto-saves every 30 seconds
   ↓
9. Client submits with signature
   ↓
10. Admin reviews in Intake Reviews page
```

### Employee Onboarding Flow (Production)

```mermaid
1. Admin adds new employee
   ↓
2. System generates upload token
   ↓
3. Welcome email sent to employee
   ↓
4. Employee clicks link
   ↓
5. Uploads required documents
   ↓
6. Files saved to AWS S3
   ↓
7. Admin tracks in Employees page
   ↓
8. Admin monitors expirations
```

---

## 🔐 TOKEN SECURITY

### Token Format
- **Type**: UUID v4
- **Length**: 36 characters
- **Format**: `550e8400-e29b-41d4-a716-446655440000`
- **Uniqueness**: Cryptographically random

### Security Features
- ✅ One token per intake form/employee
- ✅ Tokens are not guessable
- ✅ No authentication required (token IS the auth)
- ✅ Tokens don't expire (unless manually revoked)
- ✅ Can be regenerated if compromised

### Best Practices
- 🔒 Never share tokens publicly
- 🔒 Send tokens only via secure email
- 🔒 Use HTTPS in production
- 🔒 Log token access for audit trail
- 🔒 Revoke tokens if employee leaves

---

## 🆘 TROUBLESHOOTING

### Problem: "No contacts found"
**Solution**: Create a contact first:
1. Visit http://localhost:3000/client-portal/register
2. Fill out and submit registration form
3. Run token script again

### Problem: "Invalid or expired link"
**Solution**:
1. Check token exists in database
2. Verify database connection
3. Check URL is correct
4. Generate new token if needed

### Problem: "Script won't run"
**Solution**:
```bash
# Make sure you're in backend directory
cd /Users/kenanfranklin/Sites/MASCwebsite/backend

# Install dependencies if needed
npm install

# Check database connection
node -e "const db = require('./config/database'); db.query('SELECT NOW()').then(r => console.log('DB Connected:', r.rows[0]));"
```

### Problem: Token not working in browser
**Solution**:
1. Check frontend is running (npm start)
2. Check backend is running (npm run dev)
3. Verify token in database
4. Check browser console for errors
5. Try a fresh token

---

## 📞 NEED HELP?

### Check These First:
1. ✅ Backend running? (http://localhost:5001/api/health)
2. ✅ Frontend running? (http://localhost:3000)
3. ✅ Database connected? (`psql -d masc_db`)
4. ✅ Contacts exist? (Run registration form)
5. ✅ Token in database? (Check SQL query above)

### Common Commands:
```bash
# Check database
psql -d masc_db -c "SELECT COUNT(*) FROM contacts;"
psql -d masc_db -c "SELECT COUNT(*) FROM intake_forms;"
psql -d masc_db -c "SELECT COUNT(*) FROM employees;"

# Restart backend
cd backend && npm run dev

# Restart frontend
npm start

# Generate fresh token
cd backend && node scripts/create-test-intake-token.js
```

---

## ✅ QUICK REFERENCE

### Client Intake Token URLs
```
Production: https://yourdomain.com/client-portal/intake/[TOKEN]
Local:      http://localhost:3000/client-portal/intake/[TOKEN]
```

### Employee Upload Token URLs
```
Production: https://yourdomain.com/employee-portal/upload/[TOKEN]
Local:      http://localhost:3000/employee-portal/upload/[TOKEN]
```

### Helper Scripts
```bash
# Intake token
cd backend && node scripts/create-test-intake-token.js

# Employee token
cd backend && node scripts/create-test-employee-token.js
```

### Admin Dashboard Routes
```
Login:         /admin/login
Registrations: /admin/registrations (send intake here)
Employees:     /admin/employees (add employee here)
Intake Reviews: /admin/intake-reviews (review submissions)
```

---

**🎉 You're all set! Use the helper scripts for quick testing or follow the production workflow for real usage.**
