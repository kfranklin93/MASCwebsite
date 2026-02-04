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

          {/* Section 3: Medical History */}
          {currentSection === 3 && (
            <Section>
              <h2>{SECTIONS[2].title}</h2>
              <p className="section-description">{SECTIONS[2].description}</p>

              <FormInput
                label="Pediatrician Name"
                name="pediatrician_name"
                required
                error={errors.pediatrician_name}
                register={register}
                {...register('pediatrician_name', { required: 'Pediatrician name is required' })}
              />

              <FormInput
                label="Pediatrician Phone"
                name="pediatrician_phone"
                type="tel"
                required
                error={errors.pediatrician_phone}
                register={register}
                {...register('pediatrician_phone', { required: 'Phone is required' })}
              />

              <FormTextarea
                label="Current Medications"
                name="medications"
                rows={3}
                placeholder="List all current medications, dosages, and frequency"
                register={register}
              />

              <FormTextarea
                label="Known Allergies"
                name="allergies"
                rows={3}
                placeholder="Food, medication, environmental allergies, etc."
                required
                error={errors.allergies}
                register={register}
                {...register('allergies', { required: 'Please list allergies or write "None"' })}
              />

              <FormTextarea
                label="Medical Conditions"
                name="medical_conditions"
                rows={4}
                placeholder="Seizures, heart conditions, asthma, diabetes, etc."
                register={register}
              />

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Has your child had any hospitalizations or surgeries?
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <FormCheckbox
                    label="Yes"
                    name="has_hospitalizations_yes"
                    register={register}
                  />
                  <FormCheckbox
                    label="No"
                    name="has_hospitalizations_no"
                    register={register}
                  />
                </div>
              </div>

              <FormTextarea
                label="If yes, please describe"
                name="hospitalizations_details"
                rows={3}
                placeholder="Include dates and reasons for hospitalizations or surgeries"
                register={register}
              />

              <FormTextarea
                label="Developmental Milestones"
                name="developmental_milestones"
                rows={4}
                placeholder="At what age did your child: walk, talk, potty train, etc.?"
                register={register}
              />

              <FormTextarea
                label="Pregnancy & Birth History"
                name="pregnancy_birth_history"
                rows={4}
                placeholder="Any complications during pregnancy, delivery, or immediately after birth?"
                register={register}
              />
            </Section>
          )}

          {/* Section 4: Diagnoses & Assessments */}
          {currentSection === 4 && (
            <Section>
              <h2>{SECTIONS[3].title}</h2>
              <p className="section-description">{SECTIONS[3].description}</p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '16px' }}>
                  Has your child been diagnosed with Autism Spectrum Disorder (ASD)?
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="yes" {...register('has_autism_diagnosis')} />
                    Yes
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="no" {...register('has_autism_diagnosis')} />
                    No
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="pending" {...register('has_autism_diagnosis')} />
                    Pending/Evaluation in Progress
                  </label>
                </div>
              </div>

              <FormInput
                label="Date of ASD Diagnosis"
                name="diagnosis_date"
                type="date"
                register={register}
              />

              <FormInput
                label="Diagnosing Professional"
                name="diagnosing_professional"
                placeholder="Dr. Name, Credentials"
                register={register}
              />

              <FormTextarea
                label="Other Diagnoses"
                name="other_diagnoses"
                rows={4}
                placeholder="ADHD, Anxiety, Language Disorder, Sensory Processing Disorder, etc."
                register={register}
              />

              <FormTextarea
                label="Assessments Completed"
                name="assessments_completed"
                rows={4}
                placeholder="ADOS, CARS, Vineland, IQ testing, Speech/Language evaluation, etc."
                register={register}
              />

              <FormInput
                label="Most Recent Assessment Date"
                name="most_recent_assessment_date"
                type="date"
                register={register}
              />

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Do you have assessment reports available to share?
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <FormCheckbox
                    label="Yes"
                    name="has_assessment_reports_yes"
                    register={register}
                  />
                  <FormCheckbox
                    label="No"
                    name="has_assessment_reports_no"
                    register={register}
                  />
                </div>
              </div>

              <FormTextarea
                label="Autism Severity Level (if known)"
                name="autism_severity"
                rows={2}
                placeholder="Level 1, Level 2, Level 3, or describe support needs"
                register={register}
              />
            </Section>
          )}

          {/* Section 5: Current Therapies */}
          {currentSection === 5 && (
            <Section>
              <h2>{SECTIONS[4].title}</h2>
              <p className="section-description">{SECTIONS[4].description}</p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                  Current Therapies (Check all that apply):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <FormCheckbox label="ABA Therapy" name="current_aba" register={register} />
                  <FormCheckbox label="Speech Therapy" name="current_speech" register={register} />
                  <FormCheckbox label="Occupational Therapy" name="current_ot" register={register} />
                  <FormCheckbox label="Physical Therapy" name="current_pt" register={register} />
                  <FormCheckbox label="Social Skills Groups" name="current_social" register={register} />
                  <FormCheckbox label="Special Education Services" name="current_special_ed" register={register} />
                  <FormCheckbox label="Other" name="current_other" register={register} />
                </div>
              </div>

              <FormTextarea
                label="ABA Therapy Details"
                name="aba_details"
                rows={3}
                placeholder="Provider name, hours per week, start date, goals"
                register={register}
              />

              <FormTextarea
                label="Speech Therapy Details"
                name="speech_details"
                rows={3}
                placeholder="Provider name, frequency, start date, goals"
                register={register}
              />

              <FormTextarea
                label="Occupational Therapy Details"
                name="ot_details"
                rows={3}
                placeholder="Provider name, frequency, start date, goals"
                register={register}
              />

              <FormTextarea
                label="Other Therapies/Services Details"
                name="other_therapies_details"
                rows={3}
                placeholder="Describe any other therapies or support services"
                register={register}
              />

              <FormTextarea
                label="IEP/504 Plan Status"
                name="iep_504_status"
                rows={3}
                placeholder="Does your child have an IEP or 504 plan? What accommodations?"
                register={register}
              />

              <FormTextarea
                label="Previous Therapies (if any)"
                name="previous_therapies"
                rows={3}
                placeholder="Therapies tried in the past, why discontinued, outcomes"
                register={register}
              />
            </Section>
          )}

          {/* Section 6: Behavioral Observations */}
          {currentSection === 6 && (
            <Section>
              <h2>{SECTIONS[5].title}</h2>
              <p className="section-description">{SECTIONS[5].description}</p>

              <FormTextarea
                label="Strengths & Interests"
                name="child_strengths"
                rows={4}
                placeholder="What does your child do well? What are their favorite activities, toys, topics?"
                required
                error={errors.child_strengths}
                register={register}
                {...register('child_strengths', { required: 'Please describe strengths' })}
              />

              <FormTextarea
                label="Communication Skills"
                name="communication_skills"
                rows={4}
                placeholder="How does your child communicate? Verbal, nonverbal, signs, pictures? How many words?"
                required
                error={errors.communication_skills}
                register={register}
                {...register('communication_skills', { required: 'Please describe communication' })}
              />

              <FormTextarea
                label="Social Skills"
                name="social_skills"
                rows={4}
                placeholder="How does your child interact with peers and adults? Eye contact, joint attention, play skills?"
                required
                error={errors.social_skills}
                register={register}
                {...register('social_skills', { required: 'Please describe social skills' })}
              />

              <FormTextarea
                label="Daily Living Skills"
                name="daily_living_skills"
                rows={4}
                placeholder="Self-care skills: feeding, dressing, toileting, hygiene, etc."
                register={register}
              />

              <FormTextarea
                label="Challenging Behaviors"
                name="challenging_behaviors"
                rows={4}
                placeholder="Tantrums, aggression, self-injury, elopement, property destruction, etc. Frequency and triggers?"
                register={register}
              />

              <FormTextarea
                label="Sensory Sensitivities"
                name="sensory_sensitivities"
                rows={4}
                placeholder="Sensitivities to sounds, textures, lights, tastes, smells? Seeking or avoiding?"
                register={register}
              />

              <FormTextarea
                label="Sleep & Eating Patterns"
                name="sleep_eating_patterns"
                rows={3}
                placeholder="Sleep schedule, difficulties falling/staying asleep, food preferences/restrictions"
                register={register}
              />

              <FormTextarea
                label="Safety Concerns"
                name="safety_concerns"
                rows={3}
                placeholder="Elopement, lack of danger awareness, aggression, etc."
                register={register}
              />
            </Section>
          )}

          {/* Section 7: Goals & Priorities */}
          {currentSection === 7 && (
            <Section>
              <h2>{SECTIONS[6].title}</h2>
              <p className="section-description">{SECTIONS[6].description}</p>

              <FormTextarea
                label="Primary Goals for ABA Therapy"
                name="primary_goals"
                rows={5}
                placeholder="What are your top 3-5 goals for your child? (e.g., communication, social skills, behavior reduction, self-care, academic skills)"
                required
                error={errors.primary_goals}
                register={register}
                {...register('primary_goals', { required: 'Please list your goals' })}
              />

              <FormTextarea
                label="Communication Goals"
                name="communication_goals"
                rows={3}
                placeholder="Specific communication goals (e.g., increase vocabulary, use sentences, request needs)"
                register={register}
              />

              <FormTextarea
                label="Social Skills Goals"
                name="social_goals"
                rows={3}
                placeholder="Specific social goals (e.g., play with peers, share, take turns, follow group instructions)"
                register={register}
              />

              <FormTextarea
                label="Behavior Reduction Goals"
                name="behavior_goals"
                rows={3}
                placeholder="Behaviors you'd like to decrease (e.g., tantrums, aggression, repetitive behaviors)"
                register={register}
              />

              <FormTextarea
                label="Independence Goals"
                name="independence_goals"
                rows={3}
                placeholder="Self-care and daily living goals (e.g., toileting, dressing, feeding)"
                register={register}
              />

              <FormTextarea
                label="Academic/Learning Goals"
                name="academic_goals"
                rows={3}
                placeholder="Pre-academic or academic skills (e.g., colors, letters, numbers, reading, writing)"
                register={register}
              />

              <FormTextarea
                label="Family Priorities & Concerns"
                name="family_priorities"
                rows={4}
                placeholder="What matters most to your family? Any specific concerns or priorities?"
                register={register}
              />

              <FormSelect
                label="Preferred Service Setting"
                name="preferred_setting"
                options={['Home-Based', 'Center-Based', 'School-Based', 'Community-Based', 'No Preference']}
                register={register}
              />

              <FormSelect
                label="Preferred Therapy Schedule"
                name="preferred_schedule"
                options={['Morning (8am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Weekends', 'Flexible']}
                register={register}
              />

              <FormInput
                label="Preferred Hours Per Week"
                name="preferred_hours"
                type="number"
                placeholder="10, 15, 20, 25, etc."
                register={register}
              />
            </Section>
          )}

          {/* Section 8: Insurance Information */}
          {currentSection === 8 && (
            <Section>
              <h2>{SECTIONS[7].title}</h2>
              <p className="section-description">{SECTIONS[7].description}</p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '16px' }}>
                  Do you have health insurance that covers ABA therapy?
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="yes" {...register('has_insurance')} />
                    Yes
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="no" {...register('has_insurance')} />
                    No
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="radio" value="unsure" {...register('has_insurance')} />
                    Unsure
                  </label>
                </div>
              </div>

              {hasInsurance && (
                <>
                  <FormInput
                    label="Insurance Company"
                    name="insurance_company"
                    placeholder="Blue Cross, Aetna, UnitedHealthcare, etc."
                    register={register}
                  />

                  <FormInput
                    label="Policy Holder Name"
                    name="policy_holder_name"
                    register={register}
                  />

                  <FormInput
                    label="Policy/Member ID"
                    name="policy_id"
                    register={register}
                  />

                  <FormInput
                    label="Group Number"
                    name="group_number"
                    register={register}
                  />

                  <FormInput
                    label="Policy Holder Date of Birth"
                    name="policy_holder_dob"
                    type="date"
                    register={register}
                  />

                  <FormInput
                    label="Relationship to Child"
                    name="policy_holder_relationship"
                    placeholder="Parent, Guardian, Self"
                    register={register}
                  />

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Have you verified ABA therapy benefits with your insurance?
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <FormCheckbox label="Yes" name="benefits_verified_yes" register={register} />
                      <FormCheckbox label="No" name="benefits_verified_no" register={register} />
                    </div>
                  </div>

                  <FormTextarea
                    label="Known Coverage Details"
                    name="coverage_details"
                    rows={3}
                    placeholder="Deductible, copay, max hours covered, authorization requirements, etc."
                    register={register}
                  />
                </>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                  Alternative Funding Sources (Check all that apply):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <FormCheckbox label="Private Pay" name="funding_private_pay" register={register} />
                  <FormCheckbox label="Medicaid/Katie Beckett" name="funding_medicaid" register={register} />
                  <FormCheckbox label="Tricare" name="funding_tricare" register={register} />
                  <FormCheckbox label="Grants/Scholarships" name="funding_grants" register={register} />
                  <FormCheckbox label="Other" name="funding_other" register={register} />
                </div>
              </div>

              <FormTextarea
                label="Additional Insurance/Funding Notes"
                name="insurance_notes"
                rows={3}
                placeholder="Any additional information about insurance or payment"
                register={register}
              />
            </Section>
          )}

          {/* Section 9: Consent & Agreements */}
          {currentSection === 9 && (
            <Section>
              <h2>{SECTIONS[8].title}</h2>
              <p className="section-description">{SECTIONS[8].description}</p>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Consent for Services</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  I hereby authorize Mommy Angels Specialty Care to provide Applied Behavior Analysis (ABA) therapy 
                  services to my child. I understand that ABA therapy involves systematic instruction and behavioral 
                  interventions designed to improve socially significant behaviors.
                </p>
                <FormCheckbox
                  label="I consent to ABA therapy services for my child"
                  name="consent_services"
                  register={register}
                />
              </div>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Release of Information</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  I authorize Mommy Angels Specialty Care to communicate and share information with other providers 
                  (physicians, therapists, schools) involved in my child's care for coordination and continuity of services.
                </p>
                <FormCheckbox
                  label="I authorize release of information to coordinate care"
                  name="consent_release_info"
                  register={register}
                />
              </div>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Photo/Video Consent</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  Photos and videos may be taken during therapy sessions for clinical documentation, staff training, 
                  and progress monitoring purposes only. All media will be kept confidential per HIPAA regulations.
                </p>
                <FormCheckbox
                  label="I consent to photos/videos for clinical purposes"
                  name="consent_photo_video"
                  register={register}
                />
              </div>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Insurance Billing Authorization</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  I authorize Mommy Angels Specialty Care to bill my insurance company for ABA therapy services and 
                  to receive payment directly. I understand I am responsible for any deductibles, copays, or services 
                  not covered by insurance.
                </p>
                <FormCheckbox
                  label="I authorize insurance billing"
                  name="consent_billing"
                  register={register}
                />
              </div>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Cancellation Policy</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  I understand that I must provide at least 24 hours notice for any appointment cancellations. 
                  Late cancellations or no-shows may result in fees not covered by insurance.
                </p>
                <FormCheckbox
                  label="I understand and agree to the cancellation policy"
                  name="consent_cancellation"
                  register={register}
                />
              </div>

              <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0' }}>Parent Participation</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                  I understand that parent/caregiver involvement is crucial for the success of ABA therapy. 
                  I commit to attending parent training sessions and implementing strategies at home as recommended.
                </p>
                <FormCheckbox
                  label="I commit to active participation in my child's therapy"
                  name="consent_participation"
                  register={register}
                />
              </div>

              <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffc107' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '0', color: '#856404' }}>
                  ⚠️ Important Notice
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#856404', margin: '0' }}>
                  By proceeding to the next section and signing this form, you acknowledge that you have read, 
                  understood, and agree to all consents and policies outlined above. You certify that all information 
                  provided is accurate and complete to the best of your knowledge.
                </p>
              </div>

              <FormTextarea
                label="Additional Questions or Concerns"
                name="additional_concerns"
                rows={4}
                placeholder="Is there anything else you'd like us to know about your child or family?"
                register={register}
              />
            </Section>
          )}

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
