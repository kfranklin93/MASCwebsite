// ================================================================
// CREATE TEST INTAKE TOKEN
// Helper script to generate a test token for intake form testing
// Usage: node backend/scripts/create-test-intake-token.js
// ================================================================

const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

async function createTestIntakeToken() {
  try {
    console.log('🔍 Looking for existing contacts...\n');

    // Check if we have any contacts
    const contactsResult = await query(
      'SELECT id, first_name, last_name, email FROM contacts ORDER BY created_at DESC LIMIT 5'
    );

    if (contactsResult.rows.length === 0) {
      console.log('❌ No contacts found in database!');
      console.log('📝 Please create a contact first by:');
      console.log('   1. Visiting http://localhost:3000/client-portal/register');
      console.log('   2. OR submitting a contact form on the website\n');
      process.exit(1);
    }

    console.log(`✅ Found ${contactsResult.rows.length} contact(s):\n`);
    contactsResult.rows.forEach((contact, index) => {
      console.log(`   ${index + 1}. ${contact.first_name} ${contact.last_name} (${contact.email}) - ID: ${contact.id}`);
    });

    // Use the first contact
    const contact = contactsResult.rows[0];
    console.log(`\n🎯 Using contact: ${contact.first_name} ${contact.last_name} (ID: ${contact.id})\n`);

    // Generate unique token
    const token = uuidv4();

    // Check if intake form already exists for this contact
    const existingIntake = await query(
      'SELECT token FROM intake_forms WHERE contact_id = $1 AND status != $2',
      [contact.id, 'completed']
    );

    if (existingIntake.rows.length > 0) {
      console.log('ℹ️  Intake form already exists for this contact!');
      console.log(`📋 Existing token: ${existingIntake.rows[0].token}`);
      console.log(`\n🔗 Intake form URL:\n   http://localhost:3000/client-portal/intake/${existingIntake.rows[0].token}\n`);
      process.exit(0);
    }

    // Create intake form
    const intakeResult = await query(
      `INSERT INTO intake_forms (
        token, 
        contact_id, 
        status, 
        parent1_first_name, 
        parent1_last_name, 
        parent1_email, 
        parent1_phone
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [token, contact.id, 'sent', contact.first_name, contact.last_name, contact.email, contact.phone]
    );

    const intakeForm = intakeResult.rows[0];

    console.log('✅ Test intake form created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 INTAKE FORM DETAILS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n   Token:        ${intakeForm.token}`);
    console.log(`   Contact ID:   ${intakeForm.contact_id}`);
    console.log(`   Parent Name:  ${intakeForm.parent1_first_name} ${intakeForm.parent1_last_name}`);
    console.log(`   Email:        ${intakeForm.parent1_email}`);
    console.log(`   Status:       ${intakeForm.status}`);
    console.log(`   Created:      ${intakeForm.created_at}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔗 TEST INTAKE FORM URL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n   http://localhost:3000/client-portal/intake/${intakeForm.token}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 Copy the URL above and paste it in your browser to test the intake form!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test intake token:', error);
    process.exit(1);
  }
}

// Run the script
createTestIntakeToken();
