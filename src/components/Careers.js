import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from "@formspree/react";
import { Helmet } from "react-helmet-async";
import { H1, H2, Text } from './ui/Typography';
// import { PrimaryButton } from './ui/Button';
import { Form, FormGroup, Label, Input, ErrorMessage, HelpText } from './ui/Form';
import { FaDownload, FaUpload, FaCheckCircle } from 'react-icons/fa';

// Styled Components
const CareersSection = styled.section`
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const DownloadSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 4px solid #CD1B1B;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #CD1B1B 0%, #FF4444 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(205, 27, 27, 0.3);
  font-family: "Nunito", sans-serif;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #FF4444 0%, #CD1B1B 100%);
    box-shadow: 0 6px 20px rgba(205, 27, 27, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #4A90E2;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const StyledForm = styled(Form)`
  max-width: 100%;
  margin: 0;
`;

const FileInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 2px dashed ${props => props.$error ? '#D32F2F' : props.$hasFile ? '#4A90E2' : '#E0E0E0'};
  border-radius: 12px;
  background: ${props => props.$hasFile ? 'rgba(74, 144, 226, 0.05)' : '#FAFAFA'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  color: ${props => props.$hasFile ? '#4A90E2' : '#666'};

  &:hover {
    border-color: #4A90E2;
    background: rgba(74, 144, 226, 0.05);
  }

  svg {
    font-size: 1.5rem;
  }

  input[type="file"] {
    display: none;
  }
`;

const FileName = styled.div`
  font-size: 0.9rem;
  color: #4A90E2;
  margin-top: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #4CAF50;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #357ABD 0%, #4A90E2 100%);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  }

  &:disabled {
    background: #CCCCCC;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);

  h2 {
    font-family: "Bubblegum Sans", cursive;
    font-size: 2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const InfoBox = styled.div`
  background: rgba(74, 144, 226, 0.1);
  border-left: 4px solid #4A90E2;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;

  p {
    margin: 0;
    color: #333;
    line-height: 1.6;
  }
`;

const Careers = () => {
  const formId = process.env.REACT_APP_CAREERS_FORM_ID || "xvzlzpak";
  const [state, handleSubmit] = useForm(formId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    file: null
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setFormErrors(prev => ({
          ...prev,
          file: 'Please upload a PDF file only.'
        }));
        e.target.value = ''; // Clear the input
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          file: 'File size must be less than 10MB.'
        }));
        e.target.value = ''; // Clear the input
        return;
      }
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      setFormErrors(prev => ({
        ...prev,
        file: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.file) {
      errors.file = 'Please upload your completed application.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create FormData object for file upload
    // const submitData = new FormData(e.target);
    
    await handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <>
        <Helmet>
          <title>Application Submitted | Mommy Angels Specialty Care Careers</title>
        </Helmet>
        <CareersSection>
          <Container>
            <SuccessMessage>
              <h2>
                <FaCheckCircle /> Thank You!
              </h2>
              <p>
                We've received your application and will review it carefully. 
                If your qualifications match our needs, we'll contact you within 5-7 business days 
                to discuss the next steps.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We appreciate your interest in joining the Mommy Angels family!
              </p>
            </SuccessMessage>
          </Container>
        </CareersSection>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers | Join Our Team at Mommy Angels Specialty Care</title>
        <meta 
          name="description" 
          content="Join the Mommy Angels Specialty Care team. We're looking for passionate professionals to help provide exceptional ABA therapy and autism support services in Georgia." 
        />
        <meta 
          name="keywords" 
          content="ABA therapy jobs, autism care careers, special education jobs Georgia, behavioral therapist positions, early intervention careers" 
        />
      </Helmet>
      
      <CareersSection>
        <Container>
          <HeroSection>
            <H1 align="center" color="#CD1B1B" mb="1rem">
              Join Our Team
            </H1>
            <Text align="center" size="1.2rem" color="#333">
              Be part of a compassionate team dedicated to making a difference in children's lives. 
              We're always looking for talented, caring professionals to join the Mommy Angels family.
            </Text>
          </HeroSection>

          <DownloadSection>
            <H2 color="#CD1B1B" align="center" mb="1rem">
              Step 1: Download Our Application
            </H2>
            <Text align="center" mb="1rem">
              Download our fillable PDF application, complete it with your information, 
              and upload it using the form below.
            </Text>
            <DownloadButton 
              href="/assets/Employee_Application_Fixed.pdf" 
              download="Mommy_Angels_Employment_Application.pdf"
            >
              <FaDownload />
              Download Application PDF
            </DownloadButton>
          </DownloadSection>

          <FormSection>
            <H2 color="#4A90E2" align="center" mb="1rem">
              Step 2: Submit Your Application
            </H2>
            
            <InfoBox>
              <p>
                <strong>Before submitting:</strong> Make sure you've completed all sections of the PDF application 
                and saved it to your device. We accept PDF files only (max 10MB).
              </p>
            </InfoBox>

            <StyledForm onSubmit={onSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  error={formErrors.name}
                  required
                />
                {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  required
                />
                {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                <HelpText>We'll use this email to contact you about your application.</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="application">Upload Completed Application (PDF) *</Label>
                <FileInputWrapper>
                  <FileInputLabel
                    htmlFor="application"
                    $hasFile={formData.file}
                    $error={formErrors.file}
                  >
                    <input
                      type="file"
                      id="application"
                      name="application"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      required
                    />
                    <FaUpload />
                    <span>
                      {formData.file ? 'Change File' : 'Click to Upload PDF'}
                    </span>
                  </FileInputLabel>
                  {formData.file && (
                    <FileName>
                      <FaCheckCircle />
                      {formData.file.name}
                    </FileName>
                  )}
                  {formErrors.file && <ErrorMessage>{formErrors.file}</ErrorMessage>}
                  <HelpText>PDF files only, maximum size 10MB</HelpText>
                </FileInputWrapper>
              </FormGroup>

              <SubmitButton type="submit" disabled={state.submitting}>
                {state.submitting ? 'Submitting...' : 'Submit Application'}
              </SubmitButton>

              {state.errors && state.errors.length > 0 && (
                <ErrorMessage style={{ marginTop: '1rem', textAlign: 'center' }}>
                  There was an error submitting your application. Please try again or contact us directly.
                </ErrorMessage>
              )}
            </StyledForm>
          </FormSection>
        </Container>
      </CareersSection>
    </>
  );
};

export default Careers;


