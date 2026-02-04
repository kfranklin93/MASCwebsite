// ================================================================
// API SERVICE
// Centralized API calls for MASC application
// ================================================================

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 seconds
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('masc_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;
            
            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('masc_token');
                localStorage.removeItem('masc_user');
                if (window.location.pathname.startsWith('/admin')) {
                    window.location.href = '/admin/login';
                }
            }
            
            return Promise.reject(data);
        } else if (error.request) {
            // Network error
            return Promise.reject({
                success: false,
                error: 'Network Error',
                message: 'Unable to connect to server. Please check your internet connection.'
            });
        } else {
            return Promise.reject({
                success: false,
                error: 'Request Error',
                message: error.message
            });
        }
    }
);

// ================================================================
// AUTHENTICATION
// ================================================================

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
    changePassword: (currentPassword, newPassword) => 
        api.post('/auth/change-password', { currentPassword, newPassword })
};

// ================================================================
// CLIENT PORTAL
// ================================================================

export const clientAPI = {
    // Contact form
    submitContact: (data) => api.post('/client/contact', data),
    
    // Registration
    submitRegistration: (data) => api.post('/client/register', data),
    
    // Intake forms
    getIntakeForm: (token) => api.get(`/client/intake/${token}`),
    updateIntakeForm: (token, data) => api.put(`/client/intake/${token}`, data),
    submitIntakeForm: (token, data) => 
        api.put(`/client/intake/${token}`, { ...data, status: 'submitted' })
};

// ================================================================
// EMPLOYEE PORTAL
// ================================================================

export const employeeAPI = {
    getEmployee: (token) => api.get(`/employee/${token}`),
    uploadDocument: (token, formData) => {
        return api.post(`/employee/upload/${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 60000, // 60 seconds for file uploads
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        });
    },
    getDocumentDownloadUrl: (documentId, token) => 
        api.get(`/employee/document/${documentId}/download`, { params: { token } })
};

// ================================================================
// ADMIN - DASHBOARD
// ================================================================

export const adminAPI = {
    getDashboardStats: () => api.get('/admin/dashboard'),
    
    // Contacts
    getContacts: (params) => api.get('/admin/contacts', { params }),
    sendIntakeForm: (contactId) => api.post(`/admin/contacts/${contactId}/send-intake`),
    
    // Intake Forms
    getIntakeForms: (params) => api.get('/admin/intake-forms', { params }),
    getIntakeForm: (id) => api.get(`/admin/intake-forms/${id}`),
    createIntakeForm: (data) => api.post('/admin/intake-forms', data),
    submitReview: (intakeFormId, reviewData) => 
        api.post(`/admin/intake-forms/${intakeFormId}/review`, reviewData),
    
    // Employees
    getEmployees: (params) => api.get('/admin/employees', { params }),
    createEmployee: (data) => api.post('/admin/employees', data),
    updateEmployee: (id, data) => api.put(`/admin/employees/${id}`, data),
    getEmployeeDocuments: (employeeId) => api.get(`/admin/employees/${employeeId}/documents`),
    
    // Expirations
    getExpirations: (params) => api.get('/admin/expirations', { params }),
    updateExpiration: (documentId, expirationDate) => 
        api.put(`/admin/documents/${documentId}/expiration`, { expirationDate }),
    sendReminder: (documentId) => api.post(`/admin/documents/${documentId}/send-reminder`)
};

// ================================================================
// HELPER FUNCTIONS
// ================================================================

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('masc_token', token);
    } else {
        localStorage.removeItem('masc_token');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('masc_token');
};

export const setUser = (user) => {
    localStorage.setItem('masc_user', JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem('masc_user');
    return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
    localStorage.removeItem('masc_token');
    localStorage.removeItem('masc_user');
};

export default api;
