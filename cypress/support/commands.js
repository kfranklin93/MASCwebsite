// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.success).to.be.true;
    
    // Store token in localStorage
    window.localStorage.setItem('masc_token', response.body.data.token);
    window.localStorage.setItem('masc_user', JSON.stringify(response.body.data.user));
    
    return response.body.data;
  });
});

// Logout command
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('masc_token');
  window.localStorage.removeItem('masc_user');
});

// Visit protected route as authenticated user
Cypress.Commands.add('loginViaUI', (email = 'owner@mommyangelsspecialtycare.com', password = 'TempPassword123!') => {
  cy.visit('/admin/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/admin/dashboard');
});

// Submit contact form
Cypress.Commands.add('submitContactForm', (data) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/client/contact`,
    body: data
  });
});

// Create intake form
Cypress.Commands.add('createIntakeForm', (token) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/admin/intake-forms`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      parent1FirstName: 'Test',
      parent1LastName: 'Parent',
      parent1Email: 'test@example.com'
    }
  });
});

// Wait for API response
Cypress.Commands.add('waitForAPI', (alias) => {
  cy.wait(alias).its('response.statusCode').should('eq', 200);
});
