# 🚀 Quick Start Guide - Careers Portal

## ⚡ Get Started in 5 Minutes

### Step 1: Create Formspree Form (2 minutes)

1. Go to [formspree.io](https://formspree.io) and log in
2. Click "New Form" → Name it "Career Applications"
3. Copy the form ID (looks like: `xkgjkjng`)

### Step 2: Update Configuration (1 minute)

Open `.env` file and update:

```env
REACT_APP_ADMIN_PIN=1234
REACT_APP_CAREERS_FORM_ID=paste_your_form_id_here
```

**Optional:** Change `1234` to your preferred 4-digit PIN

### Step 3: Start the Application (1 minute)

```bash
npm start
```

### Step 4: Test Everything (1 minute)

**Test Public Page:**
- Visit: `http://localhost:3000/careers`
- Download the PDF
- Fill and submit the form

**Test Admin Portal:**
- Visit: `http://localhost:3000/admin/careers`
- Enter PIN: `1234` (or your custom PIN)
- Explore the dashboard

---

## 📍 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Home Page** | `/` | Careers section at `#careers` |
| **Careers Page** | `/careers` | Standalone careers page |
| **Admin Portal** | `/admin/careers` | Review applications |

---

## 🎯 What You Get

### ✅ Public Careers Page
- Professional application form
- PDF download button
- File upload (PDF only, max 10MB)
- Form validation
- Success/error messages
- Mobile responsive

### ✅ Admin Review Portal
- PIN-protected access
- Email workflow instructions
- Quick links to email & Formspree
- Application management guide
- Session persistence
- Secure logout

### ✅ Complete Documentation
- `CAREERS_SETUP.md` - Full setup guide
- `src/components/admin/README.md` - Admin portal docs
- This quick start guide

---

## 🔧 Common Tasks

### Change Admin PIN
```env
# In .env file
REACT_APP_ADMIN_PIN=your_new_pin
```

### Update Application PDF
Replace file at: `/public/assets/Employee Application.pdf`

### Customize Styling
Edit: `src/components/Careers.js` or `src/components/admin/ReviewPortal.js`

---

## 📧 Email Setup

1. **In Formspree Dashboard:**
   - Go to form settings
   - Add your email under "Notifications"
   - Save changes

2. **In Your Email:**
   - Create folder: "Career Applications"
   - Set up filter for Formspree emails
   - Never mark as spam

---

## ❓ Need Help?

- **Full Setup Guide:** See `CAREERS_SETUP.md`
- **Admin Portal Guide:** See `src/components/admin/README.md`
- **Formspree Help:** [help.formspree.io](https://help.formspree.io)

---

## ✨ You're Ready!

Your careers portal is now set up and ready to accept applications. 

**Next Steps:**
1. ✅ Create your Formspree form
2. Perfect! Now let's create a quick start guide and then test the implementation:

<write_to_file>
<path>QUICK_START.md</path>
<content># 🚀 Quick Start Guide - Careers Portal

## ⚡ Get Started in 5 Minutes

### Step 1: Create Formspree Form (2 minutes)

1. Go to [formspree.io](https://formspree.io) and log in
2. Click "New Form" → Name it "Career Applications"
3. Copy the form ID (looks like: `xkgjkjng`)

### Step 2: Update Configuration (1 minute)

Open `.env` file and update:

```env
REACT_APP_ADMIN_PIN=1234
REACT_APP_CAREERS_FORM_ID=paste_your_form_id_here
```

**Optional:** Change `1234` to your preferred 4-digit PIN

### Step 3: Start the Application (1 minute)

```bash
npm start
```

### Step 4: Test Everything (1 minute)

**Test Public Page:**
- Visit: `http://localhost:3000/careers`
- Download the PDF
- Fill and submit the form

**Test Admin Portal:**
- Visit: `http://localhost:3000/admin/careers`
- Enter PIN: `1234` (or your custom PIN)
- Explore the dashboard

---

## 📍 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Home Page** | `/` | Careers section at `#careers` |
| **Careers Page** | `/careers` | Standalone careers page |
| **Admin Portal** | `/admin/careers` | Review applications |

---

## 🎯 What You Get

### ✅ Public Careers Page
- Professional application form
- PDF download button
- File upload (PDF only, max 10MB)
- Form validation
- Success/error messages
- Mobile responsive

### ✅ Admin Review Portal
- PIN-protected access
- Email workflow instructions
- Quick links to email & Formspree
- Application management guide
- Session persistence
- Secure logout

### ✅ Complete Documentation
- `CAREERS_SETUP.md` - Full setup guide
- `src/components/admin/README.md` - Admin portal docs
- This quick start guide

---

## 🔧 Common Tasks

### Change Admin PIN
```env
# In .env file
REACT_APP_ADMIN_PIN=your_new_pin
```

### Update Application PDF
Replace file at: `/public/assets/Employee Application.pdf`

### Customize Styling
Edit: `src/components/Careers.js` or `src/components/admin/ReviewPortal.js`

---

## 📧 Email Setup

1. **In Formspree Dashboard:**
   - Go to form settings
   - Add your email under "Notifications"
   - Save changes

2. **In Your Email:**
   - Create folder: "Career Applications"
   - Set up filter for Formspree emails
   - Never mark as spam

---

## ❓ Need Help?

- **Full Setup Guide:** See `CAREERS_SETUP.md`
- **Admin Portal Guide:** See `src/components/admin/README.md`
- **Formspree Help:** [help.formspree.io](https://help.formspree.io)

---

## ✨ You're Ready!

Your careers portal is now set up and ready to accept applications. 

**Next Steps:**
1. ✅ Create your Formspree form
2. ✅ Update the `.env` file
3. ✅ Test the form submission
4. ✅ Train your team on the admin portal
5. ✅ Start receiving applications!

**Good luck with your hiring process!** 🚀