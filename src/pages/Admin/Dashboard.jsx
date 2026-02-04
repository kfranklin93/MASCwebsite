// ================================================================
// ADMIN DASHBOARD PAGE
// Main overview dashboard with statistics and quick actions
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
    Users, 
    FileText, 
    UserCheck, 
    AlertCircle,
    TrendingUp,
    Calendar,
    Mail,
    CheckCircle
} from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { adminAPI } from '../../services/api';

const DashboardLayout = styled.div`
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

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
`;

const StatCard = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const StatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
`;

const StatIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$bg || '#e5e7eb'};
    color: ${props => props.$color || '#374151'};

    svg {
        width: 24px;
        height: 24px;
    }
`;

const StatInfo = styled.div`
    flex: 1;
    margin-left: 16px;
`;

const StatLabel = styled.div`
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
`;

const StatValue = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #111827;
`;

const StatTrend = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: ${props => props.$positive ? '#10b981' : '#ef4444'};
    margin-top: 8px;

    svg {
        width: 16px;
        height: 16px;
    }
`;

const SectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Section = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #111827;
`;

const ViewAllLink = styled.a`
    font-size: 14px;
    color: #4CAF50;
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ActivityList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ActivityItem = styled.div`
    display: flex;
    gap: 12px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 8px;
`;

const ActivityIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$bg || '#e5e7eb'};
    color: ${props => props.$color || '#374151'};
    flex-shrink: 0;

    svg {
        width: 18px;
        height: 18px;
    }
`;

const ActivityContent = styled.div`
    flex: 1;
`;

const ActivityTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin-bottom: 4px;
`;

const ActivityTime = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

const ErrorMessage = styled.div`
    padding: 16px;
    background: #fee2e2;
    color: #991b1b;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const data = await adminAPI.getDashboardStats();
            setStats(data.data);
        } catch (err) {
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

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
                    <Title>Dashboard</Title>
                    <Subtitle>Welcome back! Here's what's happening today.</Subtitle>
                </Header>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <StatsGrid>
                    <StatCard>
                        <StatHeader>
                            <StatIcon $bg="#dbeafe" $color="#1e40af">
                                <Users />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Total Contacts</StatLabel>
                                <StatValue>{stats?.contacts?.total || 0}</StatValue>
                                <StatTrend $positive>
                                    <TrendingUp />
                                    {stats?.contacts?.new_this_month || 0} this month
                                </StatTrend>
                            </StatInfo>
                        </StatHeader>
                    </StatCard>

                    <StatCard>
                        <StatHeader>
                            <StatIcon $bg="#fef3c7" $color="#92400e">
                                <FileText />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Intake Forms</StatLabel>
                                <StatValue>{stats?.intake_forms?.pending || 0}</StatValue>
                                <StatTrend>
                                    <Mail />
                                    {stats?.intake_forms?.submitted || 0} submitted
                                </StatTrend>
                            </StatInfo>
                        </StatHeader>
                    </StatCard>

                    <StatCard>
                        <StatHeader>
                            <StatIcon $bg="#d1fae5" $color="#065f46">
                                <UserCheck />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Active Employees</StatLabel>
                                <StatValue>{stats?.employees?.active || 0}</StatValue>
                                <StatTrend>
                                    <CheckCircle />
                                    {stats?.employees?.total || 0} total
                                </StatTrend>
                            </StatInfo>
                        </StatHeader>
                    </StatCard>

                    <StatCard>
                        <StatHeader>
                            <StatIcon $bg="#fee2e2" $color="#991b1b">
                                <AlertCircle />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Expiring Soon</StatLabel>
                                <StatValue>{stats?.expirations?.expiring_soon || 0}</StatValue>
                                <StatTrend>
                                    <Calendar />
                                    {stats?.expirations?.expired || 0} expired
                                </StatTrend>
                            </StatInfo>
                        </StatHeader>
                    </StatCard>
                </StatsGrid>

                <SectionGrid>
                    <Section>
                        <SectionHeader>
                            <SectionTitle>Recent Activity</SectionTitle>
                            <ViewAllLink href="/admin/contacts">View All</ViewAllLink>
                        </SectionHeader>
                        <ActivityList>
                            {stats?.recent_contacts?.slice(0, 5).map((contact, index) => (
                                <ActivityItem key={index}>
                                    <ActivityIcon $bg="#dbeafe" $color="#1e40af">
                                        <Users />
                                    </ActivityIcon>
                                    <ActivityContent>
                                        <ActivityTitle>
                                            New contact from {contact.parent_name}
                                        </ActivityTitle>
                                        <ActivityTime>
                                            {new Date(contact.created_at).toLocaleDateString()}
                                        </ActivityTime>
                                    </ActivityContent>
                                </ActivityItem>
                            )) || (
                                <ActivityItem>
                                    <ActivityContent>
                                        <ActivityTitle>No recent activity</ActivityTitle>
                                    </ActivityContent>
                                </ActivityItem>
                            )}
                        </ActivityList>
                    </Section>

                    <Section>
                        <SectionHeader>
                            <SectionTitle>Pending Reviews</SectionTitle>
                            <ViewAllLink href="/admin/intake-reviews">View All</ViewAllLink>
                        </SectionHeader>
                        <ActivityList>
                            {stats?.pending_reviews?.slice(0, 5).map((form, index) => (
                                <ActivityItem key={index}>
                                    <ActivityIcon $bg="#fef3c7" $color="#92400e">
                                        <FileText />
                                    </ActivityIcon>
                                    <ActivityContent>
                                        <ActivityTitle>
                                            Intake form from {form.parent_name}
                                        </ActivityTitle>
                                        <ActivityTime>
                                            Submitted {new Date(form.submitted_at).toLocaleDateString()}
                                        </ActivityTime>
                                    </ActivityContent>
                                </ActivityItem>
                            )) || (
                                <ActivityItem>
                                    <ActivityContent>
                                        <ActivityTitle>No pending reviews</ActivityTitle>
                                    </ActivityContent>
                                </ActivityItem>
                            )}
                        </ActivityList>
                    </Section>
                </SectionGrid>
            </MainContent>
        </DashboardLayout>
    );
};

export default Dashboard;
