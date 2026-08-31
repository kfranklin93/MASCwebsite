// ================================================================
// CLIENT REGISTRATION PAGE
// Public registration form for new clients
// ================================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { clientAPI } from '../../services/api';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextarea from '../../components/forms/FormTextarea';
import FormCheckbox from '../../components/forms/FormCheckbox';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const FormCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  padding: 40px;
  text-align: center;
  
  h1 {
    margin: 0 0 12px 0;
    font-size: 32px;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    opacity: 0.9;
  }
`;

const FormContent = styled.form`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 14px 24px;
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
        &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
      `;
    }
    return `
      background: #e2e8f0;
      color: #4a5568;
      &:hover { background: #cbd5e0; }
    `;
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const servicesInterested = watch('services_interested') || [];

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);

      // Collect selected services
      const services = [];
      if (data.service_aba) services.push('ABA Therapy');
      if (data.service_speech) services.push('Speech Therapy');
      if (data.service_ot) services.push('Occupational Therapy');
      if (data.service_daycare) services.push('Daycare Services');
      if (data.service_other) services.push('Other Services');

      const payload = {
        parentFirstName: data.parent_first_name,
        parentLastName: data.parent_last_name,
        email: data.email,
        phone: data.phone,
        childName: data.child_name,
        childAge: parseInt(data.child_age),
        servicesInterested: services,
        eventType: data.preferred_contact || 'General Inquiry',
        notes: data.message || ''
      };

      const response = await clientAPI.submitRegistration(payload);

      if (response.success) {
        setSuccess(true);
        // Redirect to home after 5 seconds
        setTimeout(() => navigate('/'), 5000);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PageContainer>
        <FormCard>
          <Header>
            <h1>Registration Successful!</h1>
            <p>Thank you for your interest in our services</p>
          </Header>
          <FormContent>
            <SuccessMessage>
              <h3>✓ Your registration has been received</h3>
              <p>We've sent a confirmation email to your inbox. Our team will contact you within 1-2 business days to discuss next steps.</p>
            </SuccessMessage>
            <Button $variant="primary" onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </FormContent>
        </FormCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <h1>New Client Registration</h1>
          <p>Start your journey with Mommy Angels Specialty Care</p>
        </Header>

        <FormContent onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Section>
            <h2>Parent/Guardian Information</h2>
            
            <FormInput
              label="First Name"
              name="parent_first_name"
              placeholder="John"
              required
              error={errors.parent_first_name}
              register={register}
              {...register('parent_first_name', { 
                required: 'First name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />

            <FormInput
              label="Last Name"
              name="parent_last_name"
              placeholder="Doe"
              required
              error={errors.parent_last_name}
              register={register}
              {...register('parent_last_name', { 
                required: 'Last name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              required
              error={errors.email}
              register={register}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />

            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              required
              error={errors.phone}
              register={register}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[\d\s\-\(\)]+$/,
                  message: 'Invalid phone number'
                }
              })}
            />

            <FormSelect
              label="Preferred Contact Method"
              name="preferred_contact"
              options={['Email', 'Phone', 'Text Message']}
              required
              error={errors.preferred_contact}
              register={register}
              {...register('preferred_contact', { required: 'Please select a contact method' })}
            />
          </Section>

          <Section>
            <h2>Child Information</h2>
            
            <FormInput
              label="Child's Name"
              name="child_name"
              placeholder="Jane Doe"
              required
              error={errors.child_name}
              register={register}
              {...register('child_name', { 
                required: 'Child name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />

            <FormInput
              label="Child's Age"
              name="child_age"
              type="number"
              placeholder="5"
              required
              error={errors.child_age}
              register={register}
              {...register('child_age', { 
                required: 'Child age is required',
                min: { value: 0, message: 'Age must be 0 or greater' },
                max: { value: 18, message: 'Age must be 18 or less' }
              })}
            />
          </Section>

          <Section>
            <h2>Services Interested In</h2>
            <p style={{ fontSize: '14px', color: '#718096', marginBottom: '16px' }}>
              Select all that apply
            </p>
            
            <ServicesGrid>
              <FormCheckbox
                label="ABA Therapy"
                name="service_aba"
                register={register}
              />
              <FormCheckbox
                label="Speech Therapy"
                name="service_speech"
                register={register}
              />
              <FormCheckbox
                label="Occupational Therapy"
                name="service_ot"
                register={register}
              />
              <FormCheckbox
                label="Daycare Services"
                name="service_daycare"
                register={register}
              />
              <FormCheckbox
                label="Other Services"
                name="service_other"
                register={register}
              />
            </ServicesGrid>
          </Section>

          <Section>
            <h2>Additional Information</h2>
            
            <FormTextarea
              label="Tell us about your needs"
              name="message"
              placeholder="Please share any additional information that would help us better understand your needs..."
              rows={5}
              error={errors.message}
              register={register}
            />
          </Section>

          <ButtonGroup>
            <Button type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" $variant="primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </ButtonGroup>
        </FormContent>
      </FormCard>
    </PageContainer>
  );
};

export default Register;
