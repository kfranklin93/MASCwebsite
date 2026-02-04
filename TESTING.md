# Testing Documentation

## Overview

Comprehensive testing suite for Mommy Angels Specialty Care automation system with unit, integration, and E2E tests.

## Test Stack

### Frontend Testing
- **Jest** - Unit test runner (included with Create React App)
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **axios-mock-adapter** - API mocking

### Backend Testing
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Chai-HTTP** - HTTP integration testing
- **Sinon** - Mocking and stubbing
- **Supertest** - HTTP assertions
- **NYC** - Code coverage

## Running Tests

### Frontend Tests

```bash
# Run all unit tests
npm test

# Run tests in CI mode (no watch)
npm run test:ci

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- LoadingSpinner.test
```

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "Authentication"
```

### E2E Tests (Cypress)

```bash
# Open Cypress UI
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run E2E tests with server
npm run test:e2e
```

## Test Structure

### Frontend Tests

```
src/
├── components/
│   └── shared/
│       ├── __tests__/
│       │   ├── LoadingSpinner.test.jsx
│       │   └── ProtectedRoute.test.jsx
│       ├── LoadingSpinner.jsx
│       └── ProtectedRoute.jsx
├── pages/
│   └── Admin/
│       ├── __tests__/
│       │   └── Login.test.jsx
│       └── Login.jsx
├── services/
│   ├── __tests__/
│   │   └── api.test.js
│   └── api.js
└── setupTests.js
```

### Backend Tests

```
backend/
├── tests/
│   ├── setup.js                    # Test environment config
│   ├── helpers/
│   │   └── database.js            # Test DB utilities
│   ├── integration/
│   │   ├── auth.test.js
│   │   └── client.test.js
│   └── unit/
│       └── (unit tests here)
├── routes/
├── controllers/
└── middleware/
```

### Cypress Tests

```
cypress/
├── e2e/
│   ├── login.cy.js
│   └── client-forms.cy.js
├── fixtures/
│   └── (test data)
├── support/
│   ├── commands.js               # Custom commands
│   └── e2e.js                    # Support file
└── cypress.config.js
```

## Test Coverage Goals

- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

## Writing Tests

### Frontend Component Test Example

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Integration Test Example

```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('GET /api/endpoint', () => {
  it('returns 200 status', (done) => {
    chai.request(app)
      .get('/api/endpoint')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });
});
```

### Cypress E2E Test Example

```javascript
describe('Feature Test', () => {
  beforeEach(() => {
    cy.visit('/page');
  });

  it('completes user flow', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/success');
  });
});
```

## Test Database Setup

### Create Test Database

```bash
# Create test database
createdb masc_test_db

# Run migrations (if needed)
psql -d masc_test_db -f backend/schema.sql
```

### Environment Variables for Testing

Create `backend/.env.test`:

```env
NODE_ENV=test
DB_HOST=localhost
DB_PORT=5432
DB_NAME=masc_test_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=test-secret-key
```

## Mocking

### Mock API Calls (Frontend)

```javascript
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.onGet('/api/endpoint').reply(200, {
    success: true,
    data: { message: 'Hello' }
  });
});

afterEach(() => {
  mock.reset();
});
```

### Mock External Services (Backend)

```javascript
const sinon = require('sinon');
const emailService = require('../config/email');

describe('Email Tests', () => {
  let sendEmailStub;

  beforeEach(() => {
    sendEmailStub = sinon.stub(emailService, 'sendEmail').resolves({
      success: true
    });
  });

  afterEach(() => {
    sendEmailStub.restore();
  });

  it('sends email', async () => {
    await someFunction();
    expect(sendEmailStub.calledOnce).to.be.true;
  });
});
```

## CI/CD Integration

Tests run automatically on:
- Every push to `testing-implementation`, `automation-system`, or `main` branches
- Every pull request

### GitHub Actions Workflow

1. **Backend Tests** - Run with PostgreSQL service
2. **Frontend Tests** - Run with coverage
3. **E2E Tests** - Run Cypress tests
4. **Linting** - ESLint checks
5. **Build Test** - Verify production build

## Custom Cypress Commands

```javascript
// Login via API
cy.login('email@example.com', 'password');

// Login via UI
cy.loginViaUI();

// Logout
cy.logout();

// Submit contact form
cy.submitContactForm({ firstName: 'John', ... });

// Wait for API
cy.waitForAPI('@aliasName');
```

## Debugging Tests

### Frontend Tests

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Backend Tests

```bash
# Run tests with debug output
DEBUG=* npm test

# Run single test file
npm test -- --grep "specific test"
```

### Cypress Tests

```bash
# Open Cypress UI for debugging
npm run cypress:open

# Run with Chrome DevTools
npm run cypress:run -- --browser chrome --headed
```

## Test Data Fixtures

### Cypress Fixtures

```javascript
// cypress/fixtures/user.json
{
  "email": "test@example.com",
  "password": "TestPassword123!",
  "firstName": "Test",
  "lastName": "User"
}

// Use in tests
cy.fixture('user').then((user) => {
  cy.get('input[name="email"]').type(user.email);
});
```

### Backend Fixtures

```javascript
// tests/fixtures/users.js
module.exports = {
  adminUser: {
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin'
  },
  ownerUser: {
    email: 'owner@example.com',
    password: 'Owner123!',
    role: 'owner'
  }
};
```

## Best Practices

### General
- Write tests for new features before implementation (TDD)
- Keep tests isolated and independent
- Use descriptive test names
- Clean up after tests (database, mocks, etc.)
- Mock external dependencies

### Frontend
- Test user behavior, not implementation details
- Use `screen.getByRole()` over `getByTestId()`
- Test accessibility
- Avoid testing styled-components directly

### Backend
- Use test database, never production
- Test both success and error cases
- Test validation and edge cases
- Test authentication and authorization

### E2E
- Test critical user flows only
- Keep E2E tests fast
- Use API calls for setup when possible
- Take screenshots on failure

## Troubleshooting

### Tests Timing Out

Increase timeout in test:
```javascript
it('slow test', function() {
  this.timeout(10000); // 10 seconds
  // ...
});
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_isready

# Verify test database exists
psql -l | grep masc_test
```

### Cypress Not Finding Elements

```javascript
// Wait for element to appear
cy.get('button', { timeout: 10000 }).should('be.visible');

// Use data-testid for reliability
<button data-testid="submit-btn">Submit</button>
cy.get('[data-testid="submit-btn"]').click();
```

## Coverage Reports

### View Frontend Coverage

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

### View Backend Coverage

```bash
cd backend
npm run test:coverage
open coverage/index.html
```

## Continuous Improvement

- Review coverage reports regularly
- Add tests for bugs before fixing
- Update tests when requirements change
- Refactor tests to reduce duplication
- Keep test execution time under 5 minutes

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Documentation](https://www.chaijs.com/)
