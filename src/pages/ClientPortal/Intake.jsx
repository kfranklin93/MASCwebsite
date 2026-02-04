// ================================================================
// CLIENT INTAKE FORM - 10 SECTIONS
// Comprehensive intake form with progress tracking and auto-save
// ================================================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { clientAPI } from '../../services/api';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextarea from '../../components/forms/FormTextarea';
import FormCheckbox from '../../components/forms/FormCheckbox';
import SignaturePad from '../../components/forms/SignaturePad';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f7fafc;
  padding: 40px 20px;
`;

const FormCard = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 40px;
  
  h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
  }
`;

const ProgressBar = styled.div`
  background: #e2e8f0;
  height: 8px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }
`;

const ProgressText = styled.div`
  padding: 16px 40px;
  text-align: center;
  font-size: 14px;
  color: #718096;
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const FormContent = styled.form`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
  
  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 8px 0;
  }
  
  .section-description {
    font-size: 14px;
    color: #718096;
    margin: 0 0 24px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 2px solid #e2e8f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
      `;
    }
    return `
      background: #e2e8f0;
      color: #4a5568;
      &:hover:not(:disabled) { background: #cbd5e0; }
    `;
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SaveIndicator = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${({ $saving }) => ($saving ? '#edf2f7' : '#c6f6d5')};
  color: ${({ $saving }) => ($saving ? '#4a5568' : '#22543d')};
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 500;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  z-index: 1000;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const LoadingOverlay = styled.div`
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
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SECTIONS = [
  { id: 1, title: 'Family Information', description: 'Parent/guardian contact details' },
  { id: 2, title: 'Child Information', description: 'Basic information about your child' },
  { id: 3, title: 'Medical History', description: 'Medical background and conditions' },
  { id: 4, title: 'Diagnoses & Assessments', description: 'Autism and related diagnoses' },
  { id: 5, title: 'Current Therapies', description: 'Existing therapy services' },
  { id: 6, title: 'Behavioral Observations', description: 'Strengths, challenges, and behaviors' },
  { id: 7, title: 'Goals & Priorities', description: 'Your goals for therapy' },
  { id: 8, title: 'Insurance Information', description: 'Insurance and funding details' },
  { id: 9, title: 'Consent & Agreements', description: 'Required consents and releases' },
  { id: 10, title: 'Digital Signature', description: 'Sign to complete the form' }
];

const Intake = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  
  const [currentSection, setCurrentSection] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [signature, setSignature] = useState(null);
  
  const formData = watch();
  const hasInsurance = watch('has_insurance') === 'yes';

  // Load existing form data
  useEffect(() => {
    loadIntakeForm();
  }, [token]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [formData]);

  const loadIntakeForm = async () => {
    try {
      setLoading(true);
      const response = await clientAPI.getIntakeForm(token);
      
      if (response.success && response.data) {
        // Populate form with existing data
        Object.keys(response.data).forEach(key => {
          setValue(key, response.data[key]);
        });
        
        if (response.data.signature) {
          setSignature(response.data.signature);
        }
      }
    } catch (err) {
      setError('Unable to load intake form. Please check your link.');
    } finally {
      setLoading(false);
    }
  };

  const autoSave = async () => {
    if (!formData || Object.keys(formData).length === 0) return;
    
    try {
      setSaving(true);
      await clientAPI.updateIntakeForm(token, {
        ...formData,
        signature,
        status: 'in_progress'
      });
      
      setShowSaveIndicator(true);
      setTimeout(() => {
        setShowSaveIndicator(false);
        setSaving(false);
      }, 2000);
    } catch (err) {
      console.error('Auto-save failed:', err);
      setSaving(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);

      if (!signature) {
        setError('Please provide your digital signature before submitting.');
        setCurrentSection(10);
        return;
      }

      const payload = {
        ...data,
        signature,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      };

      const response = await clientAPI.submitIntakeForm(token, payload);

      if (response.success) {
        // Redirect to success page
        navigate('/client-portal/intake-success');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit intake form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextSection = () => {
    if (currentSection < 10) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const progress = (currentSection / 10) * 100;

  if (loading) {
    return (
      <LoadingOverlay>
        <div className="spinner" />
      </LoadingOverlay>
    );
  }

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <h1>Client Intake Form</h1>
          <p>Section {currentSection} of 10 - {SECTIONS[currentSection - 1].title}</p>
        </Header>

        <ProgressBar $progress={progress} />
        <ProgressText>{Math.round(progress)}% Complete</ProgressText>

        <FormContent onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* Section 1: Family Information */}
          {currentSection === 1 && (
            <Section>
              <h2>{SECTIONS[0].title}</h2>
              <p className="section-description">{SECTIONS[0].description}</p>

              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Primary Parent/Guardian</h3>
              
              <FormInput
                label="Full Name"
                name="parent1_name"
                placeholder="John Doe"
                required
                error={errors.parent1_name}
                register={register}
                {...register('parent1_name', { required: 'Name is required' })}
              />

              <FormInput
                label="Email Address"
                name="parent1_email"
                type="email"
                required
                error={errors.parent1_email}
                register={register}
                {...register('parent1_email', { 
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                })}
              />

              <FormInput
                label="Phone Number"
                name="parent1_phone"
                type="tel"
                required
                error={errors.parent1_phone}
                register={register}
                {...register('parent1_phone', { required: 'Phone is required' })}
              />

              <FormInput
                label="Relationship to Child"
                name="parent1_relationship"
                placeholder="Mother, Father, Guardian, etc."
                required
                error={errors.parent1_relationship}
                register={register}
                {...register('parent1_relationship', { required: 'Relationship is required' })}
              />

              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '32px 0 16px' }}>Secondary Parent/Guardian (Optional)</h3>

              <FormInput
                label="Full Name"
                name="parent2_name"
                placeholder="Jane Doe"
                register={register}
              />

              <FormInput
                label="Email Address"
                name="parent2_email"
                type="email"
                register={register}
              />

              <FormInput
                label="Phone Number"
                name="parent2_phone"
                type="tel"
                register={register}
              />

              <FormInput
                label="Relationship to Child"
                name="parent2_relationship"
                register={register}
              />

              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '32px 0 16px' }}>Primary Address</h3>

              <FormInput
                label="Street Address"
                name="address_street"
                required
                error={errors.address_street}
                register={register}
                {...register('address_street', { required: 'Address is required' })}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormInput
                  label="City"
                  name="address_city"
                  required
                  error={errors.address_city}
                  register={register}
                  {...register('address_city', { required: 'City is required' })}
                />

                <FormInput
                  label="State"
                  name="address_state"
                  required
                  error={errors.address_state}
                  register={register}
                  {...register('address_state', { required: 'State is required' })}
                />
              </div>

              <FormInput
                label="ZIP Code"
                name="address_zip"
                required
                error={errors.address_zip}
                register={register}
                {...register('address_zip', { required: 'ZIP code is required' })}
              />

              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '32px 0 16px' }}>Emergency Contact</h3>

              <FormInput
                label="Emergency Contact Name"
                name="emergency_name"
                required
                error={errors.emergency_name}
                register={register}
                {...register('emergency_name', { required: 'Emergency contact is required' })}
              />

              <FormInput
                label="Emergency Contact Phone"
                name="emergency_phone"
                type="tel"
                required
                error={errors.emergency_phone}
                register={register}
                {...register('emergency_phone', { required: 'Emergency phone is required' })}
              />

              <FormInput
                label="Relationship"
                name="emergency_relationship"
                required
                error={errors.emergency_relationship}
                register={register}
                {...register('emergency_relationship', { required: 'Relationship is required' })}
              />
            </Section>
          )}

          {/* Section 2: Child Information */}
          {currentSection === 2 && (
            <Section>
              <h2>{SECTIONS[1].title}</h2>
              <p className="section-description">{SECTIONS[1].description}</p>

              <FormInput
                label="Child's Full Legal Name"
                name="child_full_name"
                required
                error={errors.child_full_name}
                register={register}
                {...register('child_full_name', { required: 'Child name is required' })}
              />

              <FormInput
                label="Preferred Name/Nickname"
                name="child_nickname"
                register={register}
              />

              <FormInput
                label="Date of Birth"
                name="child_dob"
                type="date"
                required
                error={errors.child_dob}
                register={register}
                {...register('child_dob', { required: 'Date of birth is required' })}
              />

              <FormInput
                label="Age"
                name="child_age"
                type="number"
                required
                error={errors.child_age}
                register={register}
                {...register('child_age', { 
                  required: 'Age is required',
                  min: { value: 0, message: 'Invalid age' },
                  max: { value: 18, message: 'Must be under 18' }
                })}
              />

              <FormSelect
                label="Gender"
                name="child_gender"
                options={['Male', 'Female', 'Non-binary', 'Prefer not to say']}
                required
                error={errors.child_gender}
                register={register}
                {...register('child_gender', { required: 'Gender is required' })}
              />

              <FormInput
                label="Preferred Pronouns (Optional)"
                name="child_pronouns"
                placeholder="he/him, she/her, they/them, etc."
                register={register}
              />

              <FormTextarea
                label="Languages Spoken at Home"
                name="languages_spoken"
                placeholder="English, Spanish, etc."
                required
                error={errors.languages_spoken}
                register={register}
                {...register('languages_spoken', { required: 'Languages are required' })}
              />

              <FormInput
                label="School/Daycare Name (if applicable)"
                name="school_name"
                register={register}
              />

              <FormInput
                label="Grade Level"
                name="grade_level"
                register={register}
              />
            </Section>
          )}

          {/* Sections 3-9 will follow similar pattern - continuing in next part due to length */}

          {/* Section 10: Digital Signature */}
          {currentSection === 10 && (
            <Section>
              <h2>{SECTIONS[9].title}</h2>
              <p className="section-description">{SECTIONS[9].description}</p>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ margin: '0 0 12px', fontWeight: '600', color: '#2d3748' }}>
                  By signing below, I certify that:
                </p>
                <ul style={{ margin: '0', paddingLeft: '20px', color: '#4a5568' }}>
                  <li>All information provided is accurate and complete</li>
                  <li>I consent to ABA therapy services for my child</li>
                  <li>I understand and agree to the program policies</li>
                  <li>I authorize release of information as needed</li>
                </ul>
              </div>

              <SignaturePad
                label="Parent/Guardian Signature"
                name="signature"
                required
                onChange={setSignature}
                value={signature}
                helperText="Please sign using your mouse or finger on touchscreen"
              />

              <FormInput
                label="Printed Name"
                name="signature_name"
                required
                error={errors.signature_name}
                register={register}
                {...register('signature_name', { required: 'Printed name is required' })}
              />

              <FormInput
                label="Date"
                name="signature_date"
                type="date"
                required
                error={errors.signature_date}
                register={register}
                {...register('signature_date', { required: 'Date is required' })}
              />

              <FormInput
                label="Relationship to Child"
                name="signature_relationship"
                required
                error={errors.signature_relationship}
                register={register}
                {...register('signature_relationship', { required: 'Relationship is required' })}
              />
            </Section>
          )}

          {/* Navigation Buttons */}
          <ButtonGroup>
            <div>
              {currentSection > 1 && (
                <Button type="button" onClick={prevSection}>
                  ← Previous
                </Button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {currentSection < 10 && (
                <Button type="button" $variant="primary" onClick={nextSection}>
                  Next →
                </Button>
              )}
              {currentSection === 10 && (
                <Button type="submit" $variant="primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Intake Form'}
                </Button>
              )}
            </div>
          </ButtonGroup>
        </FormContent>
      </FormCard>

      <SaveIndicator $show={showSaveIndicator} $saving={saving}>
        {saving ? '💾 Saving...' : '✓ Saved'}
      </SaveIndicator>

      {submitting && (
        <LoadingOverlay>
          <div className="spinner" />
        </LoadingOverlay>
      )}
    </PageContainer>
  );
};

export default Intake;
