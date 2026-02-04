// ================================================================
// CREATE TEST EMPLOYEE TOKEN
// Helper script to generate a test token for employee document upload
// Usage: node backend/scripts/create-test-employee-token.js
// ================================================================

const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

async function createTestEmployeeToken() {
  try {
    console.log('🔍 Looking for existing employees...\n');

    // Check if we have any employees
    const employeesResult = await query(
      'SELECT id, first_name, last_name, email, upload_token FROM employees ORDER BY created_at DESC LIMIT 5'
    );

    if (employeesResult.rows.length === 0) {
      console.log('❌ No employees found in database!');
      console.log('📝 Creating a test employee...\n');

      // Create a test employee
      const uploadToken = uuidv4();
      const testEmployee = await query(
        `INSERT INTO employees (
          first_name, 
          last_name, 
          email, 
          phone,
          position,
          upload_token,
          status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        ['Test', 'Employee', 'test.employee@example.com', '555-1234', 'RBT', uploadToken, 'pending']
      );

      const employee = testEmployee.rows[0];

      console.log('✅ Test employee created successfully!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('👤 EMPLOYEE DETAILS');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n   ID:           ${employee.id}`);
      console.log(`   Name:         ${employee.first_name} ${employee.last_name}`);
      console.log(`   Email:        ${employee.email}`);
      console.log(`   Position:     ${employee.position}`);
      console.log(`   Token:        ${employee.upload_token}`);
      console.log(`   Status:       ${employee.status}`);
      console.log(`   Created:      ${employee.created_at}`);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔗 EMPLOYEE DOCUMENT UPLOAD URL');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n   http://localhost:3000/employee-portal/upload/${employee.upload_token}\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('💡 Copy the URL above and paste it in your browser to test document upload!\n');

      process.exit(0);
    }

    console.log(`✅ Found ${employeesResult.rows.length} employee(s):\n`);
    employeesResult.rows.forEach((employee, index) => {
      console.log(`   ${index + 1}. ${employee.first_name} ${employee.last_name} (${employee.email}) - ID: ${employee.id}`);
      if (employee.upload_token) {
        console.log(`      Token: ${employee.upload_token}`);
      }
    });

    // Use the first employee
    const employee = employeesResult.rows[0];
    console.log(`\n🎯 Using employee: ${employee.first_name} ${employee.last_name} (ID: ${employee.id})\n`);

    // Check if employee already has a token
    if (employee.upload_token) {
      console.log('✅ Employee already has an upload token!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔗 EMPLOYEE DOCUMENT UPLOAD URL');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n   http://localhost:3000/employee-portal/upload/${employee.upload_token}\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('💡 Copy the URL above and paste it in your browser to test document upload!\n');
      process.exit(0);
    }

    // Generate and assign token
    const uploadToken = uuidv4();
    await query(
      'UPDATE employees SET upload_token = $1 WHERE id = $2',
      [uploadToken, employee.id]
    );

    console.log('✅ Upload token generated successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 EMPLOYEE DETAILS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n   ID:           ${employee.id}`);
    console.log(`   Name:         ${employee.first_name} ${employee.last_name}`);
    console.log(`   Email:        ${employee.email}`);
    console.log(`   Token:        ${uploadToken}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔗 EMPLOYEE DOCUMENT UPLOAD URL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n   http://localhost:3000/employee-portal/upload/${uploadToken}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 Copy the URL above and paste it in your browser to test document upload!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test employee token:', error);
    process.exit(1);
  }
}

// Run the script
createTestEmployeeToken();
