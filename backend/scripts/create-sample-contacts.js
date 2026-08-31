// ================================================================
// CREATE SAMPLE CONTACTS
// Helper script to populate database with test contacts
// Usage: node backend/scripts/create-sample-contacts.js
// ================================================================

const { query } = require('../config/database');

const SAMPLE_CONTACTS = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    message: 'Child: Emily Johnson, Age: 4. Interested in ABA Therapy and Speech Therapy.',
    referralSource: 'Google Search',
    status: 'new'
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 234-5678',
    message: 'Child: Alex Chen, Age: 6. Recently diagnosed with ASD. Looking for comprehensive therapy program.',
    referralSource: 'Referral from Pediatrician',
    status: 'new'
  },
  {
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@example.com',
    phone: '(555) 345-6789',
    message: 'Child: Carlos Martinez, Age: 3. Early intervention needed. Developmental delays in speech and social skills.',
    referralSource: 'Facebook',
    status: 'new'
  },
  {
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@example.com',
    phone: '(555) 456-7890',
    message: 'Child: Emma Thompson, Age: 5. Current therapy ending, looking for new provider. Has IEP.',
    referralSource: 'Client Portal Registration',
    status: 'contacted'
  },
  {
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@example.com',
    phone: '(555) 567-8901',
    message: 'Child: Noah Anderson, Age: 7. Level 2 ASD. Needs 20 hours/week ABA therapy. Has insurance coverage.',
    referralSource: 'Friend Referral',
    status: 'intake_sent'
  }
];

async function createSampleContacts() {
  try {
    console.log('🔄 Creating sample contacts...\n');

    // Check if contacts already exist
    const existingCount = await query('SELECT COUNT(*) as count FROM contacts');
    
    if (existingCount.rows[0].count > 0) {
      console.log(`ℹ️  Database already has ${existingCount.rows[0].count} contact(s).`);
      console.log('   Do you want to add more sample contacts? (yes/no)');
      console.log('   To continue, run: node backend/scripts/create-sample-contacts.js --force\n');
      
      // Check if --force flag is provided
      if (!process.argv.includes('--force')) {
        console.log('💡 Tip: Use --force flag to add contacts anyway\n');
        process.exit(0);
      }
    }

    let created = 0;
    let skipped = 0;

    for (const contact of SAMPLE_CONTACTS) {
      // Check if email already exists
      const existing = await query(
        'SELECT id FROM contacts WHERE email = $1',
        [contact.email]
      );

      if (existing.rows.length > 0) {
        console.log(`⏭️  Skipping ${contact.firstName} ${contact.lastName} - email already exists`);
        skipped++;
        continue;
      }

      // Insert contact
      const result = await query(
        `INSERT INTO contacts (first_name, last_name, email, phone, message, referral_source, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [contact.firstName, contact.lastName, contact.email, contact.phone, contact.message, contact.referralSource, contact.status]
      );

      console.log(`✅ Created: ${contact.firstName} ${contact.lastName} (${contact.email})`);
      created++;
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n   ✅ Created: ${created} contact(s)`);
    console.log(`   ⏭️  Skipped: ${skipped} contact(s)`);
    
    // Show total
    const totalCount = await query('SELECT COUNT(*) as count FROM contacts');
    console.log(`   📋 Total contacts in database: ${totalCount.rows[0].count}`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SAMPLE CONTACTS READY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📍 Next Steps:');
    console.log('   1. Visit http://localhost:3000/admin/login');
    console.log('   2. Login with admin credentials');
    console.log('   3. Go to Registrations page');
    console.log('   4. You should see the sample contacts!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating sample contacts:', error);
    process.exit(1);
  }
}

// Run the script
createSampleContacts();
