// ================================================================
// EXPIRATIONS DASHBOARD
// Track and manage expiring employee documents
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Sidebar from '../../components/admin/Sidebar';
import DataTable, { ActionButton } from '../../components/admin/DataTable';

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
  margin-bottom: 32px;
  
  h1 {
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
    color: #1a202c;
  }
  
  p {
    margin: 0;
    color: #718096;
    font-size: 16px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${({ $color }) => $color};
  
  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: ${({ $color }) => $color};
    margin: 0 0 8px 0;
  }
  
  .stat-label {
    font-size: 14px;
    color: #718096;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
  
  select {
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

const ExportButton = styled.button`
  padding: 10px 20px;
  background: white;
  border: 2px solid #3182ce;
  color: #3182ce;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-left: auto;
  
  &:hover {
    background: #3182ce;
    color: white;
  }
  
  svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ $status }) => {
    switch ($status) {
      case 'expired':
        return `
          background: #fed7d7;
          color: #c53030;
        `;
      case 'critical':
        return `
          background: #feebc8;
          color: #c05621;
        `;
      case 'warning':
        return `
          background: #fefcbf;
          color: #975a16;
        `;
      case 'valid':
        return `
          background: #c6f6d5;
          color: #22543d;
        `;
      default:
        return `
          background: #e2e8f0;
          color: #4a5568;
        `;
    }
  }}
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
  max-width: 500px;
  width: 100%;
  
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
  }
  
  input {
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

const Expirations = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newExpirationDate, setNewExpirationDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    expired: 0,
    critical: 0,
    warning: 0,
    valid: 0
  });
  
  // Filter
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchExpirations();
  }, []);

  useEffect(() => {
    filterDocuments();
    calculateStats();
  }, [documents, statusFilter]);

  const fetchExpirations = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getExpirations();
      if (response.success) {
        setDocuments(response.data || []);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load expirations');
      setDocuments([]);
    } finally {
      setLoading(false);
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

  const getDaysUntilExpiration = (expirationDate) => {
    if (!expirationDate) return null;
    
    const today = new Date();
    const expDate = new Date(expirationDate);
    const days = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    
    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  const filterDocuments = () => {
    if (!documents || !Array.isArray(documents)) {
      setFilteredDocuments([]);
      return;
    }
    
    let filtered = [...documents];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const status = getExpirationStatus(doc.expiration_date);
        return status === statusFilter;
      });
    }

    // Sort by expiration date (soonest first)
    filtered.sort((a, b) => {
      if (!a.expiration_date) return 1;
      if (!b.expiration_date) return -1;
      return new Date(a.expiration_date) - new Date(b.expiration_date);
    });

    setFilteredDocuments(filtered);
  };

  const calculateStats = () => {
    if (!documents || !Array.isArray(documents)) return;
    
    const newStats = {
      expired: 0,
      critical: 0,
      warning: 0,
      valid: 0
    };

    documents.forEach(doc => {
      const status = getExpirationStatus(doc.expiration_date);
      if (newStats.hasOwnProperty(status)) {
        newStats[status]++;
      }
    });

    setStats(newStats);
  };

  const handleUpdateExpiration = async () => {
    if (!selectedDocument || !newExpirationDate) return;

    try {
      setSubmitting(true);
      const response = await adminAPI.updateExpiration(
        selectedDocument.id,
        newExpirationDate
      );

      if (response.success) {
        setSuccess('Expiration date updated successfully!');
        setSelectedDocument(null);
        setNewExpirationDate('');
        fetchExpirations();
        
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update expiration date');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendReminder = async (documentId) => {
    try {
      const response = await adminAPI.sendReminder(documentId);
      
      if (response.success) {
        setSuccess('Reminder sent successfully!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to send reminder');
    }
  };

  const handleExport = () => {
    const headers = ['Employee', 'Document Type', 'Expiration Date', 'Days Until Expiration', 'Status'];
    const rows = filteredDocuments.map(doc => [
      doc.employee_name,
      doc.document_type,
      doc.expiration_date ? new Date(doc.expiration_date).toLocaleDateString() : 'N/A',
      getDaysUntilExpiration(doc.expiration_date),
      getExpirationStatus(doc.expiration_date)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expirations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns = [
    {
      key: 'employee_name',
      label: 'Employee'
    },
    {
      key: 'document_type',
      label: 'Document Type'
    },
    {
      key: 'expiration_date',
      label: 'Expiration Date',
      render: (row) => row.expiration_date ? new Date(row.expiration_date).toLocaleDateString() : 'N/A'
    },
    {
      key: 'days_until',
      label: 'Time Until Expiration',
      render: (row) => getDaysUntilExpiration(row.expiration_date)
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const status = getExpirationStatus(row.expiration_date);
        return <StatusBadge $status={status}>{status}</StatusBadge>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <>
          <ActionButton 
            onClick={() => {
              setSelectedDocument(row);
              setNewExpirationDate(row.expiration_date || '');
            }}
          >
            Update
          </ActionButton>
          <ActionButton 
            onClick={() => handleSendReminder(row.id)}
            style={{ marginLeft: '8px' }}
          >
            Send Reminder
          </ActionButton>
        </>
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
          <h1>Document Expirations</h1>
          <p>Monitor and manage expiring employee documents</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <StatsGrid>
          <StatCard $color="#e53e3e">
            <h3 className="stat-value">{stats.expired}</h3>
            <p className="stat-label">Expired</p>
          </StatCard>

          <StatCard $color="#ed8936">
            <h3 className="stat-value">{stats.critical}</h3>
            <p className="stat-label">Critical (&lt; 7 days)</p>
          </StatCard>

          <StatCard $color="#ecc94b">
            <h3 className="stat-value">{stats.warning}</h3>
            <p className="stat-label">Warning (&lt; 30 days)</p>
          </StatCard>

          <StatCard $color="#48bb78">
            <h3 className="stat-value">{stats.valid}</h3>
            <p className="stat-label">Valid</p>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <FilterGroup>
            <label>Filter by Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Documents</option>
              <option value="expired">Expired</option>
              <option value="critical">Critical (&lt; 7 days)</option>
              <option value="warning">Warning (&lt; 30 days)</option>
              <option value="valid">Valid</option>
            </select>
          </FilterGroup>

          <ExportButton onClick={handleExport}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </ExportButton>
        </FilterBar>

        <DataTable
          columns={columns}
          data={filteredDocuments}
          emptyMessage="No expiring documents found"
          pageSize={15}
        />

        {/* Update Expiration Modal */}
        {selectedDocument && (
          <Modal onClick={() => setSelectedDocument(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>Update Expiration Date</h2>
              
              <p style={{ color: '#718096', marginBottom: '24px' }}>
                {selectedDocument.employee_name} - {selectedDocument.document_type}
              </p>

              <FormGroup>
                <label>New Expiration Date</label>
                <input
                  type="date"
                  value={newExpirationDate}
                  onChange={(e) => setNewExpirationDate(e.target.value)}
                />
              </FormGroup>

              <ButtonGroup>
                <Button onClick={() => setSelectedDocument(null)}>
                  Cancel
                </Button>
                <Button 
                  $variant="primary"
                  onClick={handleUpdateExpiration}
                  disabled={submitting || !newExpirationDate}
                >
                  {submitting ? 'Updating...' : 'Update'}
                </Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </DashboardLayout>
  );
};

export default Expirations;
