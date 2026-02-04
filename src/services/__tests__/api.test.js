// ================================================================
// API SERVICE TESTS
// ================================================================

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
  authAPI, 
  clientAPI, 
  employeeAPI, 
  adminAPI,
  setAuthToken,
  getAuthToken,
  clearAuth
} from '../api';

// Create mock adapter
const mock = new MockAdapter(axios);

describe('API Service', () => {
  beforeEach(() => {
    mock.reset();
    localStorage.clear();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('Auth Token Management', () => {
    it('sets auth token in localStorage', () => {
      const token = 'test-token-123';
      setAuthToken(token);
      expect(localStorage.getItem('masc_token')).toBe(token);
    });

    it('gets auth token from localStorage', () => {
      localStorage.setItem('masc_token', 'stored-token');
      expect(getAuthToken()).toBe('stored-token');
    });

    it('clears auth data', () => {
      localStorage.setItem('masc_token', 'token');
      localStorage.setItem('masc_user', '{"id":1}');
      clearAuth();
      expect(localStorage.getItem('masc_token')).toBeNull();
      expect(localStorage.getItem('masc_user')).toBeNull();
    });
  });

  describe('Authentication API', () => {
    it('logs in successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: 1, email: 'test@test.com', role: 'admin' },
          token: 'jwt-token'
        }
      };

      mock.onPost('/auth/login').reply(200, mockResponse);

      const result = await authAPI.login('test@test.com', 'password');
      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('test@test.com');
    });

    it('handles login failure', async () => {
      mock.onPost('/auth/login').reply(401, {
        success: false,
        error: 'Invalid credentials'
      });

      try {
        await authAPI.login('wrong@test.com', 'wrong');
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.error).toBe('Invalid credentials');
      }
    });

    it('gets current user', async () => {
      const mockUser = { id: 1, email: 'test@test.com', role: 'admin' };
      mock.onGet('/auth/me').reply(200, { success: true, data: { user: mockUser } });

      const result = await authAPI.getMe();
      expect(result.data.user).toEqual(mockUser);
    });

    it('logs out', async () => {
      mock.onPost('/auth/logout').reply(200, { success: true });
      const result = await authAPI.logout();
      expect(result.success).toBe(true);
    });
  });

  describe('Client API', () => {
    it('submits contact form', async () => {
      const contactData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-0100',
        message: 'Test message'
      };

      mock.onPost('/client/contact').reply(201, {
        success: true,
        data: { contact: { id: 1, ...contactData } }
      });

      const result = await clientAPI.submitContact(contactData);
      expect(result.success).toBe(true);
      expect(result.data.contact.email).toBe(contactData.email);
    });

    it('gets intake form by token', async () => {
      const token = 'abc-123';
      const mockForm = { id: 1, token, status: 'sent' };

      mock.onGet(`/client/intake/${token}`).reply(200, {
        success: true,
        data: { intakeForm: mockForm }
      });

      const result = await clientAPI.getIntakeForm(token);
      expect(result.data.intakeForm.token).toBe(token);
    });

    it('updates intake form', async () => {
      const token = 'abc-123';
      const updateData = { childFirstName: 'Sarah' };

      mock.onPut(`/client/intake/${token}`).reply(200, {
        success: true,
        data: { intakeForm: { token, ...updateData } }
      });

      const result = await clientAPI.updateIntakeForm(token, updateData);
      expect(result.success).toBe(true);
    });
  });

  describe('Employee API', () => {
    it('gets employee by token', async () => {
      const token = 'emp-123';
      const mockEmployee = { id: 1, firstName: 'Jane', lastName: 'Smith' };

      mock.onGet(`/employee/${token}`).reply(200, {
        success: true,
        data: { employee: mockEmployee, documents: [] }
      });

      const result = await employeeAPI.getEmployee(token);
      expect(result.data.employee.firstName).toBe('Jane');
    });

    it('uploads document', async () => {
      const token = 'emp-123';
      const formData = new FormData();
      formData.append('file', new Blob(['test']), 'test.pdf');

      mock.onPost(`/employee/upload/${token}`).reply(201, {
        success: true,
        data: { document: { id: 1, fileName: 'test.pdf' } }
      });

      const result = await employeeAPI.uploadDocument(token, formData);
      expect(result.success).toBe(true);
    });
  });

  describe('Admin API', () => {
    beforeEach(() => {
      setAuthToken('admin-token');
    });

    it('gets dashboard stats', async () => {
      const mockStats = {
        new_contacts: 5,
        pending_registrations: 3,
        pending_reviews: 2
      };

      mock.onGet('/admin/dashboard').reply(200, {
        success: true,
        data: { stats: mockStats }
      });

      const result = await adminAPI.getDashboardStats();
      expect(result.data.stats.new_contacts).toBe(5);
    });

    it('gets contacts list', async () => {
      mock.onGet('/admin/contacts').reply(200, {
        success: true,
        data: { contacts: [], total: 0 }
      });

      const result = await adminAPI.getContacts();
      expect(result.data.contacts).toEqual([]);
    });

    it('sends intake form', async () => {
      const contactId = 1;
      mock.onPost(`/admin/contacts/${contactId}/send-intake`).reply(200, {
        success: true,
        message: 'Intake form sent'
      });

      const result = await adminAPI.sendIntakeForm(contactId);
      expect(result.success).toBe(true);
    });

    it('creates employee', async () => {
      const employeeData = {
        firstName: 'New',
        lastName: 'Employee',
        email: 'new@example.com'
      };

      mock.onPost('/admin/employees').reply(201, {
        success: true,
        data: { employee: { id: 1, ...employeeData } }
      });

      const result = await adminAPI.createEmployee(employeeData);
      expect(result.data.employee.email).toBe(employeeData.email);
    });

    it('gets expirations', async () => {
      mock.onGet('/admin/expirations').reply(200, {
        success: true,
        data: { expirations: [] }
      });

      const result = await adminAPI.getExpirations();
      expect(result.data.expirations).toEqual([]);
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      mock.onPost('/auth/login').networkError();

      try {
        await authAPI.login('test@test.com', 'password');
      } catch (error) {
        expect(error.error).toBe('Network Error');
      }
    });

    it('handles 401 unauthorized', async () => {
      mock.onGet('/admin/dashboard').reply(401, {
        success: false,
        error: 'Unauthorized'
      });

      try {
        await adminAPI.getDashboardStats();
      } catch (error) {
        expect(error.success).toBe(false);
      }
    });

    it('handles 500 server errors', async () => {
      mock.onPost('/client/contact').reply(500, {
        success: false,
        error: 'Internal server error'
      });

      try {
        await clientAPI.submitContact({});
      } catch (error) {
        expect(error.success).toBe(false);
      }
    });
  });
});
