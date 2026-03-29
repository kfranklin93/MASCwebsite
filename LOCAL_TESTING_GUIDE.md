# Testing the Automation System Branch Locally

## Quick Start Guide

Here's how to test the `automation-system` branch alongside your existing `inital-commit-with-1000-changes` branch on your local device.

## Option 1: Test in a Fresh Directory (Recommended)

This keeps your existing work untouched.

```bash
# 1. Clone into a new directory
cd ~/Desktop  # or wherever you want
git clone https://github.com/kfranklin93/MASCwebsite.git MASCwebsite-testing
cd MASCwebsite-testing

# 2. Checkout the automation-system branch
git checkout automation-system

# 3. Verify you're on the right branch
git branch
# Should show: * automation-system

# 4. Install dependencies
npm install
cd backend
npm install
cd ..

# 5. Set up environment files
# See setup instructions below
```

## Option 2: Test in Your Existing Repository

If you want to test in your current repository:

```bash
# 1. Save any uncommitted changes
git status
git stash  # if you have changes

# 2. Fetch latest from remote
git fetch origin

# 3. Checkout automation-system branch
git checkout automation-system

# 4. Pull latest changes
git pull origin automation-system

# 5. Install new dependencies
npm install
cd backend
npm install
cd ..

# 6. When done testing, switch back to your branch
git checkout inital-commit-with-1000-changes
git stash pop  # restore your changes if you stashed
```

---

## Complete Setup Instructions

### Step 1: Set Up PostgreSQL Database

```bash
# Create the database
createdb masc_db

# Or if you need to specify user:
createdb -U postgres masc_db

# Run the schema
psql -d masc_db -f backend/schema.sql

# Or with user:
psql -U postgres -d masc_db -f backend/schema.sql
```

**Update Default Passwords (IMPORTANT!):**

The schema creates 3 admin users with default password `TempPassword123!`

To change passwords:

```bash
# Generate password hash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('YourNewPassword', 10).then(hash => console.log(hash));"

# Copy the hash output, then:
psql -d masc_db

# In psql, update passwords:
UPDATE admin_users 
SET password_hash = '$2b$10$YOUR_HASH_HERE' 
WHERE email = 'owner@mommyangelsspecialtycare.com';

UPDATE admin_users 
SET password_hash = '$2b$10$YOUR_HASH_HERE' 
WHERE email = 'shruthi@mommyangelsspecialtycare.com';

UPDATE admin_users 
SET password_hash = '$2b$10$YOUR_HASH_HERE' 
WHERE email = 'bcba@mommyangelsspecialtycare.com';

\q
```

Or for testing, you can use the default password: `TempPassword123!`

### Step 2: Configure Backend Environment

```bash
cd backend
cp .env.example .env
nano .env  # or code .env, vim .env, etc.
```

**Minimum configuration for local testing:**

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=masc_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_SSL=false

# JWT
JWT_SECRET=local-development-secret-key-123456789
JWT_EXPIRY=24h

# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Basic settings
WEBSITE_URL=http://localhost:3000
ADMIN_EMAIL=info@mommyangelsspecialtycare.com
```

**For full functionality, also add:**

```env
# AWS S3 (optional - for document uploads)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=masc-employee-documents

# SendGrid (optional - for email testing)
SENDGRID_API_KEY=SG.your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@mommyangelsspecialtycare.com
SENDGRID_FROM_NAME=Mommy Angels Specialty Care
```

### Step 3: Configure Frontend Environment

```bash
cd ..  # back to root directory

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev

# You should see:
# 🚀 MASC Backend Server running on port 5000
# 📊 Environment: development
# 🔗 API Base URL: http://localhost:5000/api
# ✅ Database connected successfully
```

**Troubleshooting Backend:**

If you see database connection errors:
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it:
# macOS:
brew services start postgresql

# Linux:
sudo service postgresql start

# Windows:
# Start from Services app or pg_ctl
```

### Step 5: Start the Frontend (New Terminal)

Open a new terminal window/tab:

```bash
cd ~/Desktop/MASCwebsite-testing  # or your path
npm start

# React app will start on http://localhost:3000
# Browser will open automatically
```

---

## Testing the System

### Test 1: Backend API Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "MASC Backend API is running",
  "timestamp": "2026-02-04T..."
}
```

### Test 2: Admin Login (Frontend)

1. Open http://localhost:3000/admin/login in your browser
2. Login with:
   - **Email**: `owner@mommyangelsspecialtycare.com`
   - **Password**: `TempPassword123!` (or your new password)
3. Should redirect to dashboard

**Note:** The dashboard page isn't built yet (only foundation exists), so you'll see a blank page or error. This is expected - the backend API works!

### Test 3: Admin Login (API Test)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@mommyangelsspecialtycare.com",
    "password": "TempPassword123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "owner@mommyangelsspecialtycare.com",
      "role": "owner",
      ...
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

Save the token for next tests!

### Test 4: Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/client/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-0100",
    "message": "Interested in ABA services for my 4-year-old son",
    "referralSource": "Google"
  }'
```

### Test 5: Get Dashboard Stats (Protected Route)

```bash
# Replace YOUR_TOKEN with the token from login response
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 6: View Contacts in Database

```bash
psql -d masc_db

# In psql:
SELECT * FROM contacts ORDER BY created_at DESC;
SELECT * FROM admin_users;
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 5;

\q
```

---

## What Can You Test?

### ✅ Working (Backend Complete)

1. **Authentication**
   - Admin login
   - Token generation
   - Protected routes

2. **Contact Forms**
   - Submit contact form
   - View contacts in admin
   - Send intake forms

3. **Intake Forms**
   - Create intake forms
   - Get intake form by token
   - Update intake form
   - Submit intake form

4. **Employee Management**
   - Create employees
   - Upload documents (requires S3)
   - View employee documents

5. **Email System**
   - Email logging
   - Email templates (10 types)

6. **Database**
   - All tables and relationships
   - Audit logging
   - Data persistence

### ⚠️ Not Yet Built (Frontend Pages Needed)

1. **Frontend Pages** (only foundation exists)
   - Registration page
   - 10-section intake form
   - Employee document upload
   - Admin dashboard UI
   - Expiration tracking UI

2. **File Uploads** (requires AWS S3 setup)
   - Employee document uploads
   - S3 bucket configuration

3. **Email Sending** (requires SendGrid setup)
   - Actual email delivery
   - Email notifications

---

## Testing with Postman/Insomnia

For easier API testing, import this collection:

### Create Postman Collection

1. Open Postman
2. Import > Raw Text
3. Paste this:

```json
{
  "info": {
    "name": "MASC API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"owner@mommyangelsspecialtycare.com\",\n  \"password\": \"TempPassword123!\"\n}"
            },
            "url": "http://localhost:5000/api/auth/login"
          }
        },
        {
          "name": "Get Current User",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": "http://localhost:5000/api/auth/me"
          }
        }
      ]
    },
    {
      "name": "Client",
      "item": [
        {
          "name": "Submit Contact",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"email\": \"john@example.com\",\n  \"phone\": \"555-0100\",\n  \"message\": \"Interested in services\"\n}"
            },
            "url": "http://localhost:5000/api/client/contact"
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Dashboard Stats",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": "http://localhost:5000/api/admin/dashboard"
          }
        },
        {
          "name": "Get Contacts",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": "http://localhost:5000/api/admin/contacts"
          }
        }
      ]
    }
  ]
}
```

---

## Testing Without AWS S3 or SendGrid

You can test most features without AWS or SendGrid:

### Without S3:
- Document upload endpoints will error
- Everything else works fine
- Use mock data for testing UI

### Without SendGrid:
- Email logging still works (saved to database)
- Check `email_logs` table to see what would be sent
- No actual emails delivered

To see email templates:
```bash
cd backend/utils
cat emailTemplates.js
# View the HTML email templates
```

---

## Comparing with Your Original Branch

### See What Changed:

```bash
# Show all files changed
git diff inital-commit-with-1000-changes..automation-system --name-only

# Show detailed changes
git diff inital-commit-with-1000-changes..automation-system

# See commits added
git log inital-commit-with-1000-changes..automation-system --oneline
```

### Test Both Branches Side by Side:

**Terminal 1** (Original branch):
```bash
cd ~/Desktop/MASCwebsite  # your original repo
git checkout inital-commit-with-1000-changes
npm start  # runs on port 3000
```

**Terminal 2** (Automation branch):
```bash
cd ~/Desktop/MASCwebsite-testing  # new clone
git checkout automation-system
PORT=3001 npm start  # runs on port 3001
```

Now you can compare:
- http://localhost:3000 (original)
- http://localhost:3001 (automation system)

---

## Common Issues & Solutions

### Issue: `npm install` fails

**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection error

**Solution:**
```bash
# Check PostgreSQL status
pg_isready

# Check your .env file
cat backend/.env

# Test connection manually
psql -d masc_db -U postgres
```

### Issue: Port already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 PID

# Or use different port
PORT=5001 npm run dev
```

### Issue: "Cannot find module"

**Solution:**
```bash
# Make sure you installed in both places
npm install
cd backend && npm install
```

---

## Quick Test Script

Save this as `test-api.sh`:

```bash
#!/bin/bash

echo "🧪 Testing MASC API..."
echo ""

echo "1️⃣ Health Check:"
curl -s http://localhost:5000/api/health | jq
echo ""

echo "2️⃣ Login:"
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@mommyangelsspecialtycare.com","password":"TempPassword123!"}' \
  | jq -r '.data.token')
echo "Token: ${TOKEN:0:20}..."
echo ""

echo "3️⃣ Dashboard Stats:"
curl -s http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

echo "✅ Tests Complete!"
```

Run it:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Next Steps After Testing

1. **If everything works:**
   - Review the PR: https://github.com/kfranklin93/MASCwebsite/pull/1
   - Merge into your main branch
   - Start building frontend pages

2. **If you find issues:**
   - Document the issues
   - Comment on the PR
   - I can help fix them

3. **To continue development:**
   - Stay on `automation-system` branch
   - Build the frontend pages
   - Test with real data

---

## Useful Commands

```bash
# Check current branch
git branch

# Switch branches
git checkout automation-system
git checkout inital-commit-with-1000-changes

# See all branches
git branch -a

# Update from remote
git pull origin automation-system

# View commit history
git log --oneline --graph

# See what's running
ps aux | grep node
lsof -i :5000
lsof -i :3000
```

---

## Summary

**To test locally:**
1. Clone to new directory (or checkout in existing)
2. Install dependencies (root + backend)
3. Set up PostgreSQL database
4. Configure .env files
5. Start backend server
6. Start frontend server
7. Test API endpoints
8. Check database

**You can test:**
- ✅ Backend API (100% complete)
- ✅ Database operations
- ✅ Authentication
- ✅ Admin login page
- ⚠️ Other frontend pages (not built yet)

Let me know if you hit any issues! 🚀
