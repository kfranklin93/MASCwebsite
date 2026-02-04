// Quick script to check database contents
const { query } = require('../config/database');

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...\n');
    
    // Check contacts
    const contacts = await query('SELECT COUNT(*) as count FROM contacts');
    console.log(`📋 Contacts: ${contacts.rows[0].count} records`);
    
    if (contacts.rows[0].count > 0) {
      const recentContacts = await query('SELECT id, first_name, last_name, email, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5');
      console.log('\nRecent contacts:');
      recentContacts.rows.forEach(c => {
        console.log(`  - ${c.first_name} ${c.last_name} (${c.email}) - Status: ${c.status}`);
      });
    }
    
    // Check registrations
    const registrations = await query('SELECT COUNT(*) as count FROM registrations');
    console.log(`\n📝 Registrations: ${registrations.rows[0].count} records`);
    
    if (registrations.rows[0].count > 0) {
      const recentRegs = await query('SELECT id, parent_first_name, parent_last_name, email, status, created_at FROM registrations ORDER BY created_at DESC LIMIT 5');
      console.log('\nRecent registrations:');
      recentRegs.rows.forEach(r => {
        console.log(`  - ${r.parent_first_name} ${r.parent_last_name} (${r.email}) - Status: ${r.status}`);
      });
    }
    
    // Check intake_forms
    const intakes = await query('SELECT COUNT(*) as count FROM intake_forms');
    console.log(`\n📄 Intake Forms: ${intakes.rows[0].count} records`);
    
    // Check employees
    const employees = await query('SELECT COUNT(*) as count FROM employees');
    console.log(`\n👤 Employees: ${employees.rows[0].count} records`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
