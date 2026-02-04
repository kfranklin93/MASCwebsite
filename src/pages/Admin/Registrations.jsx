// ================================================================
// REGISTRATIONS PAGE
// View and manage client registrations
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Mail, Eye, Calendar, User } from 'lucide-react';
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
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
`;

const ModalBody = styled.div`
    margin-bottom: 24px;
`;

const DetailRow = styled.div`
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
        border-bottom: none;
    }
`;

const DetailLabel = styled.div`
    width: 150px;
    font-weight: 600;
    color: #6b7280;
    font-size: 14px;
`;

const DetailValue = styled.div`
    flex: 1;
    color: #111827;
    font-size: 14px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
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

const Registrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sending, setSending] = useState(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    useEffect(() => {
        filterRegistrations();
    }, [registrations, statusFilter]);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getContacts({ type: 'registration' });
            setRegistrations(response.data || []);
        } catch (err) {
            setError(err.message || 'Failed to load registrations');
        } finally {
            setLoading(false);
        }
    };

    const filterRegistrations = () => {
        let filtered = [...registrations];
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(reg => reg.intake_form_status === statusFilter);
        }

        setFilteredRegistrations(filtered);
    };

    const handleSendIntakeForm = async (contactId) => {
        try {
            setSending(contactId);
            setError(null);
            await adminAPI.sendIntakeForm(contactId);
            setSuccess('Intake form sent successfully!');
            setTimeout(() => setSuccess(null), 3000);
            fetchRegistrations();
        } catch (err) {
            setError(err.message || 'Failed to send intake form');
        } finally {
            setSending(null);
        }
    };

    const handleViewDetails = (registration) => {
        setSelectedRegistration(registration);
        setShowModal(true);
    };

    const columns = [
        {
            header: 'Date',
            accessor: 'created_at',
            sortable: true,
            render: (row) => new Date(row.created_at).toLocaleDateString()
        },
        {
            header: 'Parent Name',
            accessor: 'parent_name',
            sortable: true
        },
        {
            header: 'Email',
            accessor: 'email',
            sortable: true
        },
        {
            header: 'Phone',
            accessor: 'phone',
            sortable: false
        },
        {
            header: 'Child Name',
            accessor: 'child_name',
            sortable: true
        },
        {
            header: 'Status',
            accessor: 'intake_form_status',
            sortable: true,
            render: (row) => <StatusBadge status={row.intake_form_status || 'pending'} />
        },
        {
            header: 'Actions',
            accessor: 'actions',
            sortable: false,
            render: (row) => (
                <ActionButtons>
                    <ActionButton onClick={() => handleViewDetails(row)}>
                        <Eye />
                        View
                    </ActionButton>
                    {(!row.intake_form_status || row.intake_form_status === 'pending') && (
                        <ActionButton
                            $variant="primary"
                            onClick={() => handleSendIntakeForm(row.contact_id)}
                            disabled={sending === row.contact_id}
                        >
                            <Mail />
                            {sending === row.contact_id ? 'Sending...' : 'Send Intake'}
                        </ActionButton>
                    )}
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
                    <Title>Client Registrations</Title>
                    <Subtitle>Manage client registrations and send intake forms</Subtitle>
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
                            <option value="pending">Pending</option>
                            <option value="sent">Sent</option>
                            <option value="in_progress">In Progress</option>
                            <option value="submitted">Submitted</option>
                        </Select>
                    </FilterGroup>
                </FilterBar>

                <DataTable
                    columns={columns}
                    data={filteredRegistrations}
                    searchable={true}
                    pagination={true}
                    itemsPerPage={10}
                    emptyMessage="No registrations found"
                />

                {showModal && selectedRegistration && (
                    <Modal onClick={() => setShowModal(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>Registration Details</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <DetailRow>
                                    <DetailLabel>Parent Name:</DetailLabel>
                                    <DetailValue>{selectedRegistration.parent_name}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Email:</DetailLabel>
                                    <DetailValue>{selectedRegistration.email}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Phone:</DetailLabel>
                                    <DetailValue>{selectedRegistration.phone}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Child Name:</DetailLabel>
                                    <DetailValue>{selectedRegistration.child_name}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Child Age:</DetailLabel>
                                    <DetailValue>{selectedRegistration.child_age}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Services:</DetailLabel>
                                    <DetailValue>
                                        {Array.isArray(selectedRegistration.services_interested) 
                                            ? selectedRegistration.services_interested.join(', ')
                                            : selectedRegistration.services_interested}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Message:</DetailLabel>
                                    <DetailValue>{selectedRegistration.message}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Status:</DetailLabel>
                                    <DetailValue>
                                        <StatusBadge status={selectedRegistration.intake_form_status || 'pending'} />
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailLabel>Submitted:</DetailLabel>
                                    <DetailValue>
                                        {new Date(selectedRegistration.created_at).toLocaleString()}
                                    </DetailValue>
                                </DetailRow>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                                {(!selectedRegistration.intake_form_status || 
                                  selectedRegistration.intake_form_status === 'pending') && (
                                    <Button
                                        $variant="primary"
                                        onClick={() => {
                                            handleSendIntakeForm(selectedRegistration.contact_id);
                                            setShowModal(false);
                                        }}
                                        disabled={sending === selectedRegistration.contact_id}
                                    >
                                        <Mail size={16} style={{ marginRight: '6px' }} />
                                        Send Intake Form
                                    </Button>
                                )}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </MainContent>
        </PageLayout>
    );
};

export default Registrations;
