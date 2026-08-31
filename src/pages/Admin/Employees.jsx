// ================================================================
// EMPLOYEES PAGE
// Employee management and document tracking
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Sidebar from '../../components/admin/Sidebar';
import DataTable, { ActionButton } from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7fafc;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 32px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  
  h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #1a202c;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const FilterBar = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 13px;
    font-weight: 600;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  select, input {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 14px;
    color: #2d3748;
    background: white;
    min-width: 150px;
    
    &:focus {
      outline: none;
      border-color: #3182ce;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  
  h2 {
    margin: 0 0 24px 0;
    font-size: 24px;
    font-weight: 700;
    color: #1a202c;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 8px;
    
    span {
      color: #e53e3e;
    }
  }
  
  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    color: #2d3748;
    
    &:focus {
      outline: none;
      border-color: #3182ce;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background: #3182ce;
        color: white;
        &:hover { background: #2c5282; }
      `;
    }
    return `
      background: #e2e8f0;
      color: #4a5568;
      &:hover { background: #cbd5e0; }
    `;
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DocumentsSection = styled.div`
  margin-top: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 16px 0;
  }
`;

const DocumentList = styled.div`
  display: grid;
  gap: 12px;
`;

const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f7fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  
  .doc-info {
    flex: 1;
    
    .doc-name {
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .doc-meta {
      font-size: 12px;
      color: #718096;
      margin: 0;
    }
  }
  
  .doc-status {
    margin-left: 16px;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    hire_date: '',
    status: 'active'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, statusFilter, searchQuery]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEmployees();
      if (response.success) {
        setEmployees(response.data || []);
      } else {
        setEmployees([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    if (!employees || !Array.isArray(employees)) {
      setFilteredEmployees([]);
      return;
    }
    
    let filtered = [...employees];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.first_name?.toLowerCase().includes(query) ||
        e.last_name?.toLowerCase().includes(query) ||
        e.email?.toLowerCase().includes(query) ||
        e.position?.toLowerCase().includes(query)
      );
    }

    setFilteredEmployees(filtered);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      console.log('Creating employee:', formData);
      
      const response = await adminAPI.createEmployee({
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        hireDate: formData.hire_date,
        status: formData.status
      });
      console.log('Response:', response);
      
      if (response.success) {
        setSuccess('Employee added successfully! Upload link sent to email.');
        setShowAddModal(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          position: '',
          hire_date: '',
          status: 'active'
        });
        fetchEmployees();
        
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to add employee');
      }
    } catch (err) {
      console.error('Add employee error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDocuments = async (employee) => {
    try {
      const response = await adminAPI.getEmployeeDocuments(employee.id);
      if (response.success) {
        setSelectedEmployee({
          ...employee,
          documents: response.data || []
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load documents');
    }
  };

  const getExpirationStatus = (expirationDate) => {
    if (!expirationDate) return 'none';
    
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) return 'expired';
    if (daysUntilExpiration <= 7) return 'critical';
    if (daysUntilExpiration <= 30) return 'warning';
    return 'valid';
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => `${row.first_name} ${row.last_name}`
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'position',
      label: 'Position'
    },
    {
      key: 'hire_date',
      label: 'Hire Date',
      render: (row) => row.hire_date ? new Date(row.hire_date).toLocaleDateString() : 'N/A'
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <ActionButton onClick={() => handleViewDocuments(row)}>
          View Documents
        </ActionButton>
      )
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <Sidebar />
        <MainContent>
          <LoadingSpinner />
        </MainContent>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Sidebar />
      <MainContent>
        <Header>
          <h1>Employee Management</h1>
          <AddButton onClick={() => setShowAddModal(true)}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Employee
          </AddButton>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FilterBar>
          <FilterGroup>
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name, email, position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup style={{ marginLeft: 'auto' }}>
            <label>&nbsp;</label>
            <div style={{ color: '#718096', fontSize: '14px', padding: '8px 0' }}>
              {filteredEmployees.length} employees
            </div>
          </FilterGroup>
        </FilterBar>

        <DataTable
          columns={columns}
          data={filteredEmployees}
          emptyMessage="No employees found"
          pageSize={15}
        />

        {/* Add Employee Modal */}
        {showAddModal && (
          <Modal onClick={() => setShowAddModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>Add New Employee</h2>
              
              <form onSubmit={handleAddEmployee}>
                <FormGroup>
                  <label>First Name <span>*</span></label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Last Name <span>*</span></label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Email <span>*</span></label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Position <span>*</span></label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  >
                    <option value="">Select Position...</option>
                    <option value="RBT">RBT (Registered Behavior Technician)</option>
                    <option value="BCBA">BCBA</option>
                    <option value="BCaBA">BCaBA</option>
                    <option value="Therapist">Therapist</option>
                    <option value="Admin">Administrative Staff</option>
                    <option value="Other">Other</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Hire Date</label>
                  <input
                    type="date"
                    value={formData.hire_date}
                    onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </FormGroup>

                <ButtonGroup>
                  <Button type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" $variant="primary" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Employee'}
                  </Button>
                </ButtonGroup>
              </form>
            </ModalContent>
          </Modal>
        )}

        {/* Employee Documents Modal */}
        {selectedEmployee && (
          <Modal onClick={() => setSelectedEmployee(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{selectedEmployee.first_name} {selectedEmployee.last_name} - Documents</h2>
              
              <DocumentsSection>
                <h3>Required Documents</h3>
                <DocumentList>
                  {selectedEmployee.documents && selectedEmployee.documents.length > 0 ? (
                    selectedEmployee.documents.map((doc) => {
                      const status = getExpirationStatus(doc.expiration_date);
                      return (
                        <DocumentItem key={doc.id}>
                          <div className="doc-info">
                            <p className="doc-name">{doc.document_type}</p>
                            <p className="doc-meta">
                              Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                              {doc.expiration_date && ` • Expires: ${new Date(doc.expiration_date).toLocaleDateString()}`}
                            </p>
                          </div>
                          <div className="doc-status">
                            <StatusBadge status={status} variant={status} />
                          </div>
                        </DocumentItem>
                      );
                    })
                  ) : (
                    <p style={{ color: '#718096', textAlign: 'center', padding: '24px' }}>
                      No documents uploaded yet
                    </p>
                  )}
                </DocumentList>
              </DocumentsSection>

              <ButtonGroup>
                <Button onClick={() => setSelectedEmployee(null)}>
                  Close
                </Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </DashboardLayout>
  );
};

export default Employees;
