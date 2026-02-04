// ================================================================
// REGISTRATIONS PAGE
// Manage client contacts and registrations
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
    
    &:focus {
      outline: none;
      border-color: #3182ce;
    }
  }
  
  select {
    min-width: 150px;
  }
  
  input {
    min-width: 200px;
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
  
  .detail-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid #e2e8f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-weight: 600;
      color: #4a5568;
    }
    
    .value {
      color: #2d3748;
    }
  }
  
  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    justify-content: flex-end;
  }
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background: #e2e8f0;
  border: none;
  color: #4a5568;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease;
  
  &:hover {
    background: #cbd5e0;
  }
`;

const SendIntakeButton = styled.button`
  padding: 10px 20px;
  background: #3182ce;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease;
  
  &:hover {
    background: #2c5282;
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const Registrations = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [sendingIntake, setSendingIntake] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, statusFilter, searchQuery]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getContacts();
      
      console.log('API Response:', response); // Debug log
      
      if (response.success && response.data) {
        // Handle both old and new response formats
        const contactsList = response.data.contacts || response.data || [];
        console.log('Contacts received:', contactsList.length); // Debug log
        setContacts(contactsList);
      } else {
        console.log('No contacts in response'); // Debug log
        setContacts([]);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err); // Debug log
      setError(err.message || 'Failed to load contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    if (!contacts || !Array.isArray(contacts)) {
      setFilteredContacts([]);
      return;
    }
    
    let filtered = [...contacts];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => {
        const parentName = c.parent_name || `${c.first_name || ''} ${c.last_name || ''}`.trim();
        const childName = c.child_name || c.message || '';
        
        return parentName.toLowerCase().includes(query) ||
               c.email?.toLowerCase().includes(query) ||
               c.phone?.toLowerCase().includes(query) ||
               childName.toLowerCase().includes(query);
      });
    }

    setFilteredContacts(filtered);
  };

  const handleSendIntakeForm = async (contactId) => {
    try {
      setSendingIntake(true);
      setError(null);
      console.log('Sending intake form for contact:', contactId);
      
      const response = await adminAPI.sendIntakeForm(contactId);
      console.log('Response:', response);
      
      if (response.success) {
        setSuccess('Intake form sent successfully! Email sent to contact.');
        setSelectedContact(null);
        fetchContacts(); // Refresh data
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to send intake form');
      }
    } catch (err) {
      console.error('Send intake error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to send intake form');
    } finally {
      setSendingIntake(false);
    }
  };

  const handleExport = () => {
    // Convert to CSV
    const headers = ['Date', 'Parent Name', 'Email', 'Phone', 'Child Info', 'Status'];
    const rows = filteredContacts.map(c => {
      const parentName = c.parent_name || `${c.first_name || ''} ${c.last_name || ''}`.trim();
      const childInfo = c.child_name || c.message || '';
      
      return [
        new Date(c.created_at).toLocaleDateString(),
        parentName,
        c.email,
        c.phone || '',
        childInfo,
        c.status
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns = [
    {
      key: 'created_at',
      label: 'Date',
      render: (row) => new Date(row.created_at).toLocaleDateString()
    },
    {
      key: 'parent_name',
      label: 'Parent Name',
      render: (row) => row.parent_name || `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'N/A'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (row) => row.phone || 'N/A'
    },
    {
      key: 'child_name',
      label: 'Child Info',
      render: (row) => {
        // Extract child info from message if exists
        if (row.message && row.message.includes('Child:')) {
          return row.message.substring(0, 50) + (row.message.length > 50 ? '...' : '');
        }
        return row.child_name || 'N/A';
      }
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
        <>
          <ActionButton onClick={() => setSelectedContact(row)}>
            View Details
          </ActionButton>
          {row.status === 'new' && (
            <ActionButton 
              onClick={() => handleSendIntakeForm(row.id)}
              style={{ marginLeft: '8px' }}
            >
              Send Intake
            </ActionButton>
          )}
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
          <h1>Client Registrations</h1>
          <ExportButton onClick={handleExport}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </ExportButton>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FilterBar>
          <FilterGroup>
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="intake_sent">Intake Sent</option>
              <option value="intake_completed">Intake Completed</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup style={{ marginLeft: 'auto' }}>
            <label>&nbsp;</label>
            <div style={{ color: '#718096', fontSize: '14px', padding: '8px 0' }}>
              Showing {filteredContacts.length} of {contacts.length} contacts
            </div>
          </FilterGroup>
        </FilterBar>

        <DataTable
          columns={columns}
          data={filteredContacts}
          emptyMessage="No contacts found"
          pageSize={15}
        />

        {/* Contact Detail Modal */}
        {selectedContact && (
          <Modal onClick={() => setSelectedContact(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>Contact Details</h2>
              
              <div className="detail-row">
                <div className="label">Date Submitted:</div>
                <div className="value">{new Date(selectedContact.created_at).toLocaleString()}</div>
              </div>
              
              <div className="detail-row">
                <div className="label">Parent Name:</div>
                <div className="value">{selectedContact.parent_name || `${selectedContact.first_name} ${selectedContact.last_name}`}</div>
              </div>
              
              <div className="detail-row">
                <div className="label">Email:</div>
                <div className="value">{selectedContact.email}</div>
              </div>
              
              <div className="detail-row">
                <div className="label">Phone:</div>
                <div className="value">{selectedContact.phone || 'N/A'}</div>
              </div>
              
              <div className="detail-row">
                <div className="label">Details:</div>
                <div className="value" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedContact.message || 'No additional information provided'}
                </div>
              </div>
              
              <div className="detail-row">
                <div className="label">Referral Source:</div>
                <div className="value">{selectedContact.referral_source || 'N/A'}</div>
              </div>
              
              <div className="detail-row">
                <div className="label">Status:</div>
                <div className="value">
                  <StatusBadge status={selectedContact.status} />
                </div>
              </div>
              
              <div className="modal-actions">
                <CloseButton onClick={() => setSelectedContact(null)}>
                  Close
                </CloseButton>
                {selectedContact.status === 'new' && (
                  <SendIntakeButton
                    onClick={() => handleSendIntakeForm(selectedContact.id)}
                    disabled={sendingIntake}
                  >
                    {sendingIntake ? 'Sending...' : 'Send Intake Form'}
                  </SendIntakeButton>
                )}
              </div>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </DashboardLayout>
  );
};

export default Registrations;
