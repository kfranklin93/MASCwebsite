// ================================================================
// INTAKE REVIEWS PAGE
// BCBA review of intake forms with 17-criteria checklist
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
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  
  h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 700;
    color: #1a202c;
  }
  
  .subtitle {
    margin: 0 0 24px 0;
    color: #718096;
    font-size: 14px;
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  .label {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  
  .value {
    font-size: 14px;
    color: #2d3748;
  }
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: ${({ $checked }) => ($checked ? '#f0fff4' : '#fff')};
  border: 1px solid ${({ $checked }) => ($checked ? '#9ae6b4' : '#e2e8f0')};
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  input[type="checkbox"] {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    flex: 1;
    font-size: 14px;
    color: #2d3748;
    cursor: pointer;
    line-height: 1.5;
  }
`;

const ChecklistScore = styled.div`
  background: #edf2f7;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 24px;
  
  .score {
    font-size: 36px;
    font-weight: 700;
    color: ${({ $score }) => {
      if ($score >= 14) return '#48bb78';
      if ($score >= 10) return '#ed8936';
      return '#f56565';
    }};
  }
  
  .label {
    font-size: 14px;
    color: #718096;
    margin-top: 4px;
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
  
  select, textarea {
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
  
  textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
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
    if ($variant === 'success') {
      return `
        background: #48bb78;
        color: white;
        &:hover { background: #38a169; }
      `;
    }
    if ($variant === 'danger') {
      return `
        background: #f56565;
        color: white;
        &:hover { background: #e53e3e; }
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

const ELIGIBILITY_CRITERIA = [
  { id: 1, label: 'Child is between 18 months and 18 years old' },
  { id: 2, label: 'Formal autism diagnosis (DSM-5) from qualified professional' },
  { id: 3, label: 'Child requires behavioral intervention services' },
  { id: 4, label: 'Family demonstrates commitment to treatment plan' },
  { id: 5, label: 'Parent/guardian available for regular collaboration' },
  { id: 6, label: 'Child does not pose safety risk to self or others' },
  { id: 7, label: 'Child does not require 24/7 medical supervision' },
  { id: 8, label: 'Geographic location allows for service delivery' },
  { id: 9, label: 'Appropriate staffing available for case' },
  { id: 10, label: 'Schedule allows for minimum recommended hours' },
  { id: 11, label: 'Insurance coverage verified (or private pay arranged)' },
  { id: 12, label: 'Prior authorization obtained (if required)' },
  { id: 13, label: 'Home environment suitable for therapy' },
  { id: 14, label: 'No conflicting therapies during proposed hours' },
  { id: 15, label: 'Family understands ABA methodology and expectations' },
  { id: 16, label: 'Medical clearance obtained (if needed)' },
  { id: 17, label: 'Assessment indicates potential for meaningful progress' }
];

const IntakeReviews = () => {
  const [intakeForms, setIntakeForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Filter
  const [statusFilter, setStatusFilter] = useState('submitted');
  
  // Review form state
  const [checklist, setChecklist] = useState({});
  const [decision, setDecision] = useState('');
  const [notes, setNotes] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  useEffect(() => {
    fetchIntakeForms();
  }, []);

  useEffect(() => {
    filterForms();
  }, [intakeForms, statusFilter]);

  const fetchIntakeForms = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getIntakeForms({ status: statusFilter });
      if (response.success) {
        setIntakeForms(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load intake forms');
    } finally {
      setLoading(false);
    }
  };

  const filterForms = () => {
    let filtered = [...intakeForms];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(f => f.status === statusFilter);
    }
    
    setFilteredForms(filtered);
  };

  const handleReviewForm = (form) => {
    setSelectedForm(form);
    
    // Initialize checklist if existing review
    if (form.review) {
      const checklistObj = {};
      form.review.checklist_data?.forEach(item => {
        checklistObj[item.id] = item.met;
      });
      setChecklist(checklistObj);
      setDecision(form.review.decision || '');
      setNotes(form.review.notes || '');
      setNextSteps(form.review.next_steps || '');
    } else {
      setChecklist({});
      setDecision('');
      setNotes('');
      setNextSteps('');
    }
  };

  const handleChecklistChange = (id, checked) => {
    setChecklist(prev => ({ ...prev, [id]: checked }));
  };

  const calculateScore = () => {
    return Object.values(checklist).filter(Boolean).length;
  };

  const handleSubmitReview = async () => {
    try {
      if (!decision) {
        setError('Please select a decision');
        return;
      }

      setSubmitting(true);
      
      const checklistData = ELIGIBILITY_CRITERIA.map(criterion => ({
        id: criterion.id,
        label: criterion.label,
        met: checklist[criterion.id] || false
      }));

      const reviewData = {
        checklist_data: checklistData,
        overall_score: calculateScore(),
        decision,
        notes,
        next_steps: nextSteps
      };

      const response = await adminAPI.submitReview(selectedForm.id, reviewData);
      
      if (response.success) {
        setSuccess('Review submitted successfully!');
        setSelectedForm(null);
        fetchIntakeForms();
        
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'submitted_at',
      label: 'Date',
      render: (row) => new Date(row.submitted_at || row.created_at).toLocaleDateString()
    },
    {
      key: 'parent_name',
      label: 'Parent Name',
      render: (row) => row.family_info?.parent_name || 'N/A'
    },
    {
      key: 'child_name',
      label: 'Child Name',
      render: (row) => row.child_info?.child_name || 'N/A'
    },
    {
      key: 'child_age',
      label: 'Age',
      render: (row) => row.child_info?.child_age || 'N/A'
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
        <ActionButton onClick={() => handleReviewForm(row)}>
          {row.status === 'submitted' ? 'Review' : 'View Review'}
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
          <h1>Intake Reviews</h1>
          <p>BCBA eligibility assessment and decision workflow</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FilterBar>
          <FilterGroup>
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="submitted">Submitted (Needs Review)</option>
              <option value="accepted">Accepted</option>
              <option value="evaluation_needed">Evaluation Needed</option>
              <option value="waitlist">Waitlist</option>
              <option value="declined">Declined</option>
            </select>
          </FilterGroup>

          <FilterGroup style={{ marginLeft: 'auto' }}>
            <label>&nbsp;</label>
            <div style={{ color: '#718096', fontSize: '14px', padding: '8px 0' }}>
              {filteredForms.length} forms
            </div>
          </FilterGroup>
        </FilterBar>

        <DataTable
          columns={columns}
          data={filteredForms}
          emptyMessage="No intake forms found"
          pageSize={15}
        />

        {/* Review Modal */}
        {selectedForm && (
          <Modal onClick={() => setSelectedForm(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>BCBA Eligibility Review</h2>
              <p className="subtitle">
                Intake Form #{selectedForm.id} • Submitted {new Date(selectedForm.submitted_at || selectedForm.created_at).toLocaleDateString()}
              </p>

              {/* Client Information */}
              <Section>
                <h3>Client Information</h3>
                <InfoGrid>
                  <InfoItem>
                    <div className="label">Parent Name</div>
                    <div className="value">{selectedForm.family_info?.parent_name || 'N/A'}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Child Name</div>
                    <div className="value">{selectedForm.child_info?.child_name || 'N/A'}</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Child Age</div>
                    <div className="value">{selectedForm.child_info?.child_age || 'N/A'} years</div>
                  </InfoItem>
                  <InfoItem>
                    <div className="label">Diagnosis</div>
                    <div className="value">{selectedForm.diagnoses?.primary_diagnosis || 'N/A'}</div>
                  </InfoItem>
                </InfoGrid>
              </Section>

              {/* Eligibility Checklist */}
              <Section>
                <h3>Eligibility Checklist (17 Criteria)</h3>
                
                <ChecklistScore $score={calculateScore()}>
                  <div className="score">{calculateScore()} / 17</div>
                  <div className="label">Criteria Met</div>
                </ChecklistScore>

                {ELIGIBILITY_CRITERIA.map(criterion => (
                  <ChecklistItem key={criterion.id} $checked={checklist[criterion.id]}>
                    <input
                      type="checkbox"
                      id={`criterion-${criterion.id}`}
                      checked={checklist[criterion.id] || false}
                      onChange={(e) => handleChecklistChange(criterion.id, e.target.checked)}
                      disabled={selectedForm.status !== 'submitted'}
                    />
                    <label htmlFor={`criterion-${criterion.id}`}>
                      {criterion.label}
                    </label>
                  </ChecklistItem>
                ))}
              </Section>

              {/* Decision Section */}
              <Section>
                <h3>Decision & Next Steps</h3>
                
                <FormGroup>
                  <label>Decision *</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    disabled={selectedForm.status !== 'submitted'}
                  >
                    <option value="">Select Decision...</option>
                    <option value="accepted">Accept - Ready for Onboarding</option>
                    <option value="evaluation_needed">Evaluation Needed - Schedule Assessment</option>
                    <option value="waitlist">Waitlist - No Current Capacity</option>
                    <option value="declined">Decline - Not Eligible</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this review..."
                    disabled={selectedForm.status !== 'submitted'}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Next Steps</label>
                  <textarea
                    value={nextSteps}
                    onChange={(e) => setNextSteps(e.target.value)}
                    placeholder="What actions need to be taken next?"
                    disabled={selectedForm.status !== 'submitted'}
                  />
                </FormGroup>
              </Section>

              <ButtonGroup>
                <Button onClick={() => setSelectedForm(null)}>
                  Close
                </Button>
                {selectedForm.status === 'submitted' && (
                  <Button
                    $variant="success"
                    onClick={handleSubmitReview}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                )}
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </DashboardLayout>
  );
};

export default IntakeReviews;
