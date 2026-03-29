// ================================================================
// ADMIN LOGIN E2E TESTS
// ================================================================

describe('Admin Login Flow', () => {
  beforeEach(() => {
    cy.visit('/admin/login');
  });

  it('displays login form', () => {
    cy.contains('Mommy Angels').should('be.visible');
    cy.contains('Admin Portal').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Sign In');
  });

  it('shows validation errors for empty form', () => {
    cy.get('button[type="submit"]').click();
    
    // HTML5 validation should prevent submission
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('shows error for invalid credentials', () => {
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Should show error message
    cy.contains(/invalid/i).should('be.visible');
    
    // Should stay on login page
    cy.url().should('include', '/admin/login');
  });

  it('successfully logs in with valid credentials', () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    
    cy.get('input[type="email"]').type('owner@mommyangelsspecialtycare.com');
    cy.get('input[type="password"]').type('TempPassword123!');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginRequest');
    
    // Should redirect to dashboard
    cy.url().should('include', '/admin/dashboard');
    
    // Token should be stored
    cy.window().then((win) => {
      expect(win.localStorage.getItem('masc_token')).to.exist;
      expect(win.localStorage.getItem('masc_user')).to.exist;
    });
  });

  it('disables form while submitting', () => {
    cy.get('input[type="email"]').type('owner@mommyangelsspecialtycare.com');
    cy.get('input[type="password"]').type('TempPassword123!');
    
    // Intercept and delay the request
    cy.intercept('POST', '/api/auth/login', (req) => {
      req.reply((res) => {
        res.delay = 1000;
        res.send();
      });
    }).as('loginRequest');
    
    cy.get('button[type="submit"]').click();
    
    // Form should be disabled
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[type="email"]').should('be.disabled');
    cy.get('input[type="password"]').should('be.disabled');
  });

  it('persists login after page refresh', () => {
    // Login
    cy.loginViaUI();
    
    // Refresh page
    cy.reload();
    
    // Should still be on dashboard
    cy.url().should('include', '/admin/dashboard');
  });

  it('redirects to login when accessing protected route without auth', () => {
    cy.visit('/admin/dashboard');
    
    // Should redirect to login
    cy.url().should('include', '/admin/login');
  });
});
