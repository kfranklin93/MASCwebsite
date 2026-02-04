// ================================================================
// ADMIN DASHBOARD PAGE
// Main dashboard with statistics and overview
// ================================================================

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Sidebar from '../../components/admin/Sidebar';

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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 24px;
      height: 24px;
      color: white;
    }
    
    &.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    &.green { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); }
    &.yellow { background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); }
    &.red { background: linear-gradient(135deg, #fc8181 0%, #f56565 100%); }
  }
  
  .stat-value {
    font-size: 36px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 8px 0;
  }
  
  .stat-label {
    font-size: 14px;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
  
  .stat-change {
    font-size: 12px;
    margin-top: 8px;
    
    &.positive {
      color: #48bb78;
    }
    
    &.negative {
      color: #f56565;
    }
  }
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
  
  h2 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #1a202c;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ActionButton = styled.button`
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  svg {
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto 8px;
  }
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #1a202c;
  }
`;

const ActivityList = styled.div`
  .activity-item {
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .activity-title {
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .activity-meta {
      font-size: 13px;
      color: #718096;
      margin: 0;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
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
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your organization.</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <StatsGrid>
          <StatCard onClick={() => navigate('/admin/registrations')}>
            <div className="stat-header">
              <div>
                <h3 className="stat-value">{stats?.contacts?.total || 0}</h3>
                <p className="stat-label">Total Contacts</p>
              </div>
              <div className="stat-icon blue">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="stat-change positive">
              {stats?.contacts?.new || 0} new this month
            </p>
          </StatCard>

          <StatCard onClick={() => navigate('/admin/intake-reviews')}>
            <div className="stat-header">
              <div>
                <h3 className="stat-value">{stats?.intakeForms?.pending || 0}</h3>
                <p className="stat-label">Pending Reviews</p>
              </div>
              <div className="stat-icon yellow">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="stat-change">
              {stats?.intakeForms?.total || 0} total forms
            </p>
          </StatCard>

          <StatCard onClick={() => navigate('/admin/employees')}>
            <div className="stat-header">
              <div>
                <h3 className="stat-value">{stats?.employees?.active || 0}</h3>
                <p className="stat-label">Active Employees</p>
              </div>
              <div className="stat-icon green">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="stat-change">
              {stats?.employees?.total || 0} total employees
            </p>
          </StatCard>

          <StatCard onClick={() => navigate('/admin/expirations')}>
            <div className="stat-header">
              <div>
                <h3 className="stat-value">{stats?.expirations?.expiring || 0}</h3>
                <p className="stat-label">Expiring Soon</p>
              </div>
              <div className="stat-icon red">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="stat-change negative">
              {stats?.expirations?.expired || 0} already expired
            </p>
          </StatCard>
        </StatsGrid>

        <QuickActions>
          <h2>Quick Actions</h2>
          <ActionGrid>
            <ActionButton onClick={() => navigate('/admin/registrations')}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              View New Contacts
            </ActionButton>
            <ActionButton onClick={() => navigate('/admin/intake-reviews')}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Review Intakes
            </ActionButton>
            <ActionButton onClick={() => navigate('/admin/employees')}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Manage Employees
            </ActionButton>
            <ActionButton onClick={() => navigate('/admin/expirations')}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Check Expirations
            </ActionButton>
          </ActionGrid>
        </QuickActions>

        <RecentActivity>
          <h2>Recent Activity</h2>
          <ActivityList>
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-meta">{activity.time} • {activity.user}</p>
                </div>
              ))
            ) : (
              <div className="activity-item">
                <p className="activity-title">No recent activity</p>
                <p className="activity-meta">Activity will appear here as actions are taken</p>
              </div>
            )}
          </ActivityList>
        </RecentActivity>
      </MainContent>
    </DashboardLayout>
  );
};

export default Dashboard;
