import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { H1, H2, Text } from '../ui/Typography';
import { FaLock, FaEnvelope, FaExternalLinkAlt, FaSignOutAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  padding: 6rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  border-top: 4px solid #CD1B1B;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const LockIcon = styled.div`
  font-size: 3rem;
  color: #CD1B1B;
  margin-bottom: 1.5rem;
`;

const PinInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const PinInput = styled.input`
  width: 60px;
  height: 60px;
  font-size: 2rem;
  text-align: center;
  border: 2px solid ${props => props.$error ? '#D32F2F' : '#E0E0E0'};
  border-radius: 12px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #CD1B1B 0%, #FF4444 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(205, 27, 27, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #FF4444 0%, #CD1B1B 100%);
    box-shadow: 0 6px 20px rgba(205, 27, 27, 0.4);
  }

  &:disabled {
    background: #CCCCCC;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: #D32F2F;
  font-size: 0.9rem;
  margin-top: 1rem;
  font-weight: 600;
`;

const DashboardHeader = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 4px solid #CD1B1B;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #666;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #444;
    transform: translateY(-2px);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => props.color || '#4A90E2'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.color || '#4A90E2'};
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: "Bubblegum Sans", cursive;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-family: "Nunito", sans-serif;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4A90E2;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: #357ABD;
    gap: 0.75rem;
  }
`;

const InstructionsList = styled.ol`
  text-align: left;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: #333;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0.05) 100%);
  border-left: 4px solid #4A90E2;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;

  p {
    margin: 0;
    color: #333;
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  svg {
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`;

const SuccessBox = styled(InfoBox)`
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
  border-left-color: #4CAF50;

  p {
    color: #2E7D32;
  }
`;

const ReviewPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const adminPin = process.env.REACT_APP_ADMIN_PIN || '1234';

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredPin = pin.join('');
    
    setTimeout(() => {
      if (enteredPin === adminPin) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
        setError('');
      } else {
        setError('Incorrect PIN. Please try again.');
        setPin(['', '', '', '']);
        document.getElementById('pin-0')?.focus();
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPin(['', '', '', '']);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Careers Review Portal</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <PageContainer>
          <Container>
            <LoginCard>
              <LockIcon>
                <FaLock />
              </LockIcon>
              <H2 align="center" color="#CD1B1B" mb="0.5rem">
                Admin Access
              </H2>
              <Text align="center" color="#666" mb="2rem">
                Enter your 4-digit PIN to access the careers review portal
              </Text>
              
              <form onSubmit={handleLogin}>
                <PinInputWrapper>
                  {pin.map((digit, index) => (
                    <PinInput
                      key={index}
                      id={`pin-${index}`}
                      type="password"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      $error={error}
                      autoFocus={index === 0}
                    />
                  ))}
                </PinInputWrapper>
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
                
                <LoginButton type="submit" disabled={loading || pin.some(d => !d)}>
                  {loading ? 'Verifying...' : 'Access Portal'}
                </LoginButton>
              </form>
            </LoginCard>
          </Container>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers Review Portal | Mommy Angels Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PageContainer>
        <Container>
          <DashboardHeader>
            <div>
              <H1 color="#CD1B1B" mb="0.5rem">
                Careers Review Portal
              </H1>
              <Text color="#666">
                Manage and review career applications
              </Text>
            </div>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </LogoutButton>
          </DashboardHeader>

          <SuccessBox>
            <p>
              <FaCheckCircle size={20} color="#4CAF50" />
              <span>
                <strong>Welcome back!</strong> You're successfully logged into the admin portal.
              </span>
            </p>
          </SuccessBox>

          <DashboardGrid>
            <Card color="#4A90E2">
              <CardIcon color="#4A90E2">
                <FaEnvelope />
              </CardIcon>
              <CardTitle>Check Your Email</CardTitle>
              <CardText>
                All career applications are sent directly to your email via Formspree. 
                Check your inbox for new submissions with the subject line containing "Career Application".
              </CardText>
              <ExternalLink 
                href="https://mail.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Open Gmail <FaExternalLinkAlt size={14} />
              </ExternalLink>
            </Card>

            <Card color="#FF9800">
              <CardIcon color="#FF9800">
                <FaExternalLinkAlt />
              </CardIcon>
              <CardTitle>Formspree Dashboard</CardTitle>
              <CardText>
                View all submissions, download attachments, and manage your forms directly 
                in your Formspree account dashboard.
              </CardText>
              <ExternalLink 
                href="https://formspree.io/forms" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Open Formspree <FaExternalLinkAlt size={14} />
              </ExternalLink>
            </Card>
          </DashboardGrid>

          <Card color="#4CAF50">
            <CardIcon color="#4CAF50">
              <FaInfoCircle />
            </CardIcon>
            <CardTitle>How to Review Applications</CardTitle>
            <InstructionsList>
              <li>
                <strong>Email Notifications:</strong> Each application submission triggers an email 
                to your registered address with the applicant's information and attached PDF.
              </li>
              <li>
                <strong>Download PDFs:</strong> Open the email and download the attached application 
                PDF to review the candidate's qualifications.
              </li>
              <li>
                <strong>Organize Applications:</strong> Create folders in your email (e.g., "Under Review", 
                "Interview", "Hired") to track application status.
              </li>
              <li>
                <strong>Respond Promptly:</strong> Reply to applicants within 5-7 business days to 
                maintain a professional hiring process.
              </li>
              <li>
                <strong>Schedule Interviews:</strong> For qualified candidates, send interview 
                invitations directly from your email.
              </li>
            </InstructionsList>

            <InfoBox>
              <p>
                <FaInfoCircle color="#4A90E2" />
                <span>
                  <strong>Pro Tip:</strong> Set up email filters to automatically organize career 
                  applications into a dedicated folder for easier management.
                </span>
              </p>
            </InfoBox>
          </Card>

          <Card color="#9C27B0">
            <CardTitle>Application Management Best Practices</CardTitle>
            <CardText>
              <strong>Keep Track:</strong> Maintain a simple spreadsheet with applicant names, 
              application dates, and current status.
            </CardText>
            <CardText>
              <strong>Compliance:</strong> Store applications securely and follow employment 
              law requirements for record retention.
            </CardText>
            <CardText>
              <strong>Communication:</strong> Even if not moving forward, send a polite rejection 
              email to maintain your organization's reputation.
            </CardText>
          </Card>
        </Container>
      </PageContainer>
    </>
  );
};

export default ReviewPortal;

// Made with Bob
