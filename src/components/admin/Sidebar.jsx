// ================================================================
// ADMIN SIDEBAR COMPONENT
// Navigation sidebar for admin dashboard
// ================================================================

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
    LayoutDashboard, 
    Users, 
    ClipboardList, 
    FileText, 
    UserCheck, 
    Calendar,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const SidebarContainer = styled.aside`
    width: 260px;
    height: 100vh;
    background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    overflow-y: auto;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    }
`;

const SidebarHeader = styled.div`
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
`;

const UserInfo = styled.div`
    margin-top: 12px;
`;

const UserName = styled.div`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
`;

const UserRole = styled.div`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: capitalize;
`;

const Nav = styled.nav`
    padding: 20px 0;
`;

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
    }

    &.active {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-left-color: #4CAF50;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 20px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    margin-top: 20px;

    &:hover {
        background: rgba(255, 99, 71, 0.1);
        color: #ff6347;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const MobileToggle = styled.button`
    display: none;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
    background: #1a1a2e;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
        display: block;
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

const Overlay = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: ${props => props.$isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
`;

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            <MobileToggle onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
            </MobileToggle>

            <Overlay $isOpen={isOpen} onClick={closeSidebar} />

            <SidebarContainer $isOpen={isOpen}>
                <SidebarHeader>
                    <Logo>MASC Admin</Logo>
                    <UserInfo>
                        <UserName>{user?.first_name} {user?.last_name}</UserName>
                        <UserRole>{user?.role?.replace('_', ' ')}</UserRole>
                    </UserInfo>
                </SidebarHeader>

                <Nav>
                    <NavItem to="/admin/dashboard" onClick={closeSidebar}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavItem>

                    <NavItem to="/admin/contacts" onClick={closeSidebar}>
                        <Users />
                        <span>Contacts</span>
                    </NavItem>

                    <NavItem to="/admin/registrations" onClick={closeSidebar}>
                        <ClipboardList />
                        <span>Registrations</span>
                    </NavItem>

                    <NavItem to="/admin/intake-reviews" onClick={closeSidebar}>
                        <FileText />
                        <span>Intake Reviews</span>
                    </NavItem>

                    <NavItem to="/admin/employees" onClick={closeSidebar}>
                        <UserCheck />
                        <span>Employees</span>
                    </NavItem>

                    <NavItem to="/admin/expirations" onClick={closeSidebar}>
                        <Calendar />
                        <span>Expirations</span>
                    </NavItem>

                    <LogoutButton onClick={handleLogout}>
                        <LogOut />
                        <span>Logout</span>
                    </LogoutButton>
                </Nav>
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
