// ================================================================
// CONTACT FORM E2E TESTS
// ================================================================

describe('Contact Form Submission', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('submits contact form successfully', () => {
    cy.intercept('POST', '/api/client/contact').as('contactSubmit');
    
    // Scroll to contact section
    cy.get('#contact').scrollIntoView();
    
    // Fill out form (adjust selectors based on actual form)
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('555-0100');
    cy.get('textarea[name="message"]').type('I am interested in your ABA therapy services for my child.');
    
    // Submit form
    cy.get('button[type="submit"]').contains(/submit|send/i).click();
    
    // Wait for API call
    cy.wait('@contactSubmit').its('response.statusCode').should('eq', 201);
    
    // Should show success message
    cy.contains(/thank you|success|received/i).should('be.visible');
  });

  it('validates required fields', () => {
    cy.get('#contact').scrollIntoView();
    
    // Try to submit empty form
    cy.get('button[type="submit"]').contains(/submit|send/i).click();
    
    // Check HTML5 validation
    cy.get('input[name="firstName"]:invalid').should('exist');
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('validates email format', () => {
    cy.get('#contact').scrollIntoView();
    
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    
    cy.get('button[type="submit"]').contains(/submit|send/i).click();
    
    // Email should be invalid
    cy.get('input[name="email"]:invalid').should('exist');
  });
});

// ================================================================
// REGISTRATION FORM E2E TESTS
// ================================================================

describe('Registration Form', () => {
  it('submits registration form successfully', () => {
    cy.intercept('POST', '/api/client/register').as('registerSubmit');
    
    cy.visit('/client-portal/register');
    
    // Fill out registration form
    cy.get('input[name="parentFirstName"]').type('Jane');
    cy.get('input[name="parentLastName"]').type('Smith');
    cy.get('input[name="email"]').type('jane.smith@example.com');
    cy.get('input[name="phone"]').type('555-0200');
    cy.get('input[name="childName"]').type('Tommy');
    cy.get('input[name="childAge"]').type('4');
    
    cy.get('button[type="submit"]').click();
    
    cy.wait('@registerSubmit').its('response.statusCode').should('eq', 201);
    
    // Should show confirmation
    cy.contains(/thank you|registered|success/i).should('be.visible');
  });
});
