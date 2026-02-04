// ================================================================
// INTAKE REVIEWS PAGE
// Review and manage submitted intake forms with BCBA checklist
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Eye, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { adminAPI } from '../../services/api';

const PageLayout = styled.div`
    display: flex;
    min-height: 100vh;
    background: #f3f4f6;
`;

const MainContent = styled.main`
    flex: 1;
    margin-left: 260px;
    padding: 40px;

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 80px 20px 20px;
    }
`;

const Header = styled.div`
    margin-bottom: 32px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #6b7280;
`;

const FilterBar = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
`;

const Select = styled.select`
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const ActionButton = styled.button`
    padding: 8px 12px;
    background: ${props => props.$variant === 'primary' ? '#4CAF50' : 'white'};
    color: ${props => props.$variant === 'primary' ? 'white' : '#374151'};
    border: 1px solid ${props => props.$variant === 'primary' ? '#4CAF50' : '#d1d5db'};
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;

    &:hover {
        background: ${props => props.$variant === 'primary' ? '#45a049' : '#f3f4f6'};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    svg {
        width: 16px;
        height: 16px;
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
    z-index: 1000;
    padding: 20px;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 12px;
    padding: 32px;
    max-width: 900px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
`;

const ModalSubtitle = styled.div`
    font-size: 14px;
    color: #6b7280;
`;

const Section = styled.div`
    margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
`;

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
`;

const DetailRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const DetailLabel = styled.div`
    font-weight: 600;
    color: #6b7280;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const DetailValue = styled.div`
    color: #111827;
    font-size: 14px;
`;

const ChecklistSection = styled.div`
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const ChecklistItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: white;
    border-radius: 6px;
    margin-bottom: 8px;
`;

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #4CAF50;
`;

const ChecklistLabel = styled.label`
    flex: 1;
    font-size: 14px;
    color: #374151;
    cursor: pointer;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;

    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
`;

const DecisionButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
`;

const DecisionButton = styled.button`
    padding: 16px;
    border: 2px solid ${props => props.$active ? props.$color : '#d1d5db'};
    background: ${props => props.$active ? props.$color : 'white'};
    color: ${props => props.$active ? 'white' : '#374151'};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &:hover {
        border-color: ${props => props.$color};
        background: ${props => props.$active ? props.$color : `${props.$color}10`};
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 20px;
    border-top: 2px solid #e5e7eb;
`;

const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    ${props => props.$variant === 'primary' ? `
        background: #4CAF50;
        color: white;
        &:hover { background: #45a049; }
    ` : `
        background: #e5e7eb;
        color: #374151;
        &:hover { background: #d1d5db; }
    `}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const SuccessMessage = styled.div`
    padding: 16px;
    background: #d1fae5;
    color: #065f46;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const ErrorMessage = styled.div`
    padding: 16px;
    background: #fee2e2;
    color: #991b1b;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const CHECKLIST_ITEMS = [
    'Child is between 18 months and 21 years old',
    'Has autism diagnosis or developmental delay',
    'Requires ABA therapy services',
    'Family committed to therapy schedule',
    'Home environment suitable for services',
    'Parents available for training',
    'No safety concerns identified',
    'Geographic service area coverage',
    'Insurance verification completed',
    'Medical records obtained',
    'Previous therapy history reviewed',
    'School collaboration possible',
    'Adequate staffing available',
    'BCBA availability confirmed',
    'RBT resources allocated',
    'Family understands ABA process',
    'Realistic therapy goals identified'
];

const IntakeReviews = () => {
    const [intakeForms, setIntakeForms] = useState([]);
    const [filteredForms, setFilteredForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [submitting, setSubmitting] = useState(false);

    // Review form state
    const [checklist, setChecklist] = useState(CHECKLIST_ITEMS.map(() => false));
    const [decision, setDecision] = useState('');
    const [reviewNotes, setReviewNotes] = useState('');
    const [nextSteps, setNextSteps] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [followUpOwner, setFollowUpOwner] = useState('');

    useEffect(() => {
        fetchIntakeForms();
    }, []);

    useEffect(() => {
        filterForms();
    }, [intakeForms, statusFilter]);

    const fetchIntakeForms = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getIntakeForms({ status: 'submitted' });
            setIntakeForms(response.data || []);
        } catch (err) {
            setError(err.message || 'Failed to load intake forms');
        } finally {
            setLoading(false);
        }
    };

    const filterForms = () => {
        let filtered = [...intakeForms];
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(form => form.review_status === statusFilter);
        }

        setFilteredForms(filtered);
    };

    const handleViewForm = (form) => {
        setSelectedForm(form);
        setShowModal(true);
        resetReviewForm();
    };

    const resetReviewForm = () => {
        setChecklist(CHECKLIST_ITEMS.map(() => false));
        setDecision('');
        setReviewNotes('');
        setNextSteps('');
        setFollowUpDate('');
        setFollowUpOwner('');
    };

    const handleChecklistChange = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index] = !newChecklist[index];
        setChecklist(newChecklist);
    };

    const handleSubmitReview = async () => {
        if (!decision) {
            setError('Please select a decision');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const reviewData = {
                checklist_items: CHECKLIST_ITEMS.map((item, index) => ({
                    criteria: item,
                    met: checklist[index]
                })),
                overall_score: checklist.filter(Boolean).length,
                decision,
                review_notes: reviewNotes,
                next_steps: nextSteps,
                follow_up_date: followUpDate || null,
                follow_up_owner: followUpOwner || null
            };

            await adminAPI.submitReview(selectedForm.intake_form_id, reviewData);
            setSuccess('Review submitted successfully!');
            setTimeout(() => setSuccess(null), 3000);
            setShowModal(false);
            fetchIntakeForms();
        } catch (err) {
            setError(err.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const columns = [
        {
            header: 'Submitted',
            accessor: 'submitted_at',
            sortable: true,
            render: (row) => new Date(row.submitted_at).toLocaleDateString()
        },
        {
            header: 'Parent Name',
            accessor: 'parent_name',
            sortable: true
        },
        {
            header: 'Child Name',
            accessor: 'child_name',
            sortable: true
        },
        {
            header: 'Child Age',
            accessor: 'child_age',
            sortable: true
        },
        {
            header: 'Review Status',
            accessor: 'review_status',
            sortable: true,
            render: (row) => <StatusBadge status={row.review_status || 'pending'} />
        },
        {
            header: 'Actions',
            accessor: 'actions',
            sortable: false,
            render: (row) => (
                <ActionButtons>
                    <ActionButton
                        $variant="primary"
                        onClick={() => handleViewForm(row)}
                    >
                        <Eye />
                        Review
                    </ActionButton>
                </ActionButtons>
            )
        }
    ];

    if (loading) {
        return (
            <PageLayout>
                <Sidebar />
                <MainContent>
                    <LoadingSpinner />
                </MainContent>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Sidebar />
            <MainContent>
                <Header>
                    <Title>Intake Form Reviews</Title>
                    <Subtitle>Review submitted intake forms and make acceptance decisions</Subtitle>
                </Header>

                {success && <SuccessMessage>{success}</SuccessMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <FilterBar>
                    <FilterGroup>
                        <Label>Filter by Status</Label>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending Review</option>
                            <option value="accepted">Accepted</option>
                            <option value="evaluation_needed">Evaluation Needed</option>
                            <option value="waitlist">Waitlist</option>
                            <option value="declined">Declined</option>
                        </Select>
                    </FilterGroup>
                </FilterBar>

                <DataTable
                    columns={columns}
                    data={filteredForms}
                    searchable={true}
                    pagination={true}
                    itemsPerPage={10}
                    emptyMessage="No intake forms to review"
                />

                {showModal && selectedForm && (
                    <Modal onClick={() => setShowModal(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>Intake Form Review</ModalTitle>
                                <ModalSubtitle>
                                    Submitted on {new Date(selectedForm.submitted_at).toLocaleString()}
                                </ModalSubtitle>
                            </ModalHeader>

                            <Section>
                                <SectionTitle>Family Information</SectionTitle>
                                <DetailGrid>
                                    <DetailRow>
                                        <DetailLabel>Parent Name</DetailLabel>
                                        <DetailValue>{selectedForm.parent_name}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Email</DetailLabel>
                                        <DetailValue>{selectedForm.parent_email}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Phone</DetailLabel>
                                        <DetailValue>{selectedForm.parent_phone}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Address</DetailLabel>
                                        <DetailValue>{selectedForm.address}</DetailValue>
                                    </DetailRow>
                                </DetailGrid>
                            </Section>

                            <Section>
                                <SectionTitle>Child Information</SectionTitle>
                                <DetailGrid>
                                    <DetailRow>
                                        <DetailLabel>Child Name</DetailLabel>
                                        <DetailValue>{selectedForm.child_name}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Date of Birth</DetailLabel>
                                        <DetailValue>{selectedForm.child_dob}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Age</DetailLabel>
                                        <DetailValue>{selectedForm.child_age}</DetailValue>
                                    </DetailRow>
                                    <DetailRow>
                                        <DetailLabel>Gender</DetailLabel>
                                        <DetailValue>{selectedForm.child_gender}</DetailValue>
                                    </DetailRow>
                                </DetailGrid>
                            </Section>

                            <Section>
                                <SectionTitle>BCBA Eligibility Checklist</SectionTitle>
                                <ChecklistSection>
                                    {CHECKLIST_ITEMS.map((item, index) => (
                                        <ChecklistItem key={index}>
                                            <Checkbox
                                                type="checkbox"
                                                id={`checklist-${index}`}
                                                checked={checklist[index]}
                                                onChange={() => handleChecklistChange(index)}
                                            />
                                            <ChecklistLabel htmlFor={`checklist-${index}`}>
                                                {item}
                                            </ChecklistLabel>
                                        </ChecklistItem>
                                    ))}
                                    <DetailRow style={{ marginTop: '16px' }}>
                                        <DetailLabel>Score</DetailLabel>
                                        <DetailValue>
                                            {checklist.filter(Boolean).length} / {CHECKLIST_ITEMS.length} criteria met
                                        </DetailValue>
                                    </DetailRow>
                                </ChecklistSection>
                            </Section>

                            <Section>
                                <SectionTitle>Decision</SectionTitle>
                                <DecisionButtons>
                                    <DecisionButton
                                        $active={decision === 'accepted'}
                                        $color="#10b981"
                                        onClick={() => setDecision('accepted')}
                                    >
                                        <CheckCircle />
                                        Accept
                                    </DecisionButton>
                                    <DecisionButton
                                        $active={decision === 'evaluation_needed'}
                                        $color="#f59e0b"
                                        onClick={() => setDecision('evaluation_needed')}
                                    >
                                        <Clock />
                                        Evaluation
                                    </DecisionButton>
                                    <DecisionButton
                                        $active={decision === 'waitlist'}
                                        $color="#6b7280"
                                        onClick={() => setDecision('waitlist')}
                                    >
                                        <FileText />
                                        Waitlist
                                    </DecisionButton>
                                    <DecisionButton
                                        $active={decision === 'declined'}
                                        $color="#ef4444"
                                        onClick={() => setDecision('declined')}
                                    >
                                        <XCircle />
                                        Decline
                                    </DecisionButton>
                                </DecisionButtons>

                                <FormGroup>
                                    <Label>Review Notes</Label>
                                    <TextArea
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        placeholder="Add notes about your decision..."
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Next Steps</Label>
                                    <TextArea
                                        value={nextSteps}
                                        onChange={(e) => setNextSteps(e.target.value)}
                                        placeholder="What are the next steps?"
                                    />
                                </FormGroup>

                                <DetailGrid>
                                    <FormGroup>
                                        <Label>Follow-up Date</Label>
                                        <Input
                                            type="date"
                                            value={followUpDate}
                                            onChange={(e) => setFollowUpDate(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Follow-up Owner</Label>
                                        <Input
                                            type="text"
                                            value={followUpOwner}
                                            onChange={(e) => setFollowUpOwner(e.target.value)}
                                            placeholder="Who will follow up?"
                                        />
                                    </FormGroup>
                                </DetailGrid>
                            </Section>

                            <ModalFooter>
                                <Button onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    $variant="primary"
                                    onClick={handleSubmitReview}
                                    disabled={submitting || !decision}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </MainContent>
        </PageLayout>
    );
};

export default IntakeReviews;
