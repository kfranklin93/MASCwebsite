import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import styled from 'styled-components';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';

// Styled-components for the form and elements
const FormContainer = styled.section`
  background-color: #fff;
  color: #333;
  padding: 60px 20px;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  color: rgb(0, 0, 255);
  margin-bottom: 20px;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
  text-align: left;
  display: block;
`;

const InputField = styled.input`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  background-color: #f9f9f9;
`;

const TextAreaField = styled.textarea`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  background-color: #f9f9f9;
  resize: vertical;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  padding: 15px;
  margin-top: 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b7dc4;
  }
`;

const ConsentText = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-top: 20px;
  text-align: left;
`;

const InsuranceDropdown = styled.div`
  margin: 10px 0;
  text-align: left;
`;

function ContactForm() {
  const [state, handleSubmit] = useForm("xkgjkjng"); // Replace with your actual Formspree form ID
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    age: '',
    dob: '',
    email: '',
    phone: '',
    dateOfLastEval: '',
    insuranceProvider: null,
    behaviorsOfConcern: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const insuranceOptions = [
    { value: "aetna", label: "Aetna" },
    { value: "ambetter", label: "Ambetter" },
    { value: "amerigroup", label: "Amerigroup" },
    { value: "bluecross", label: "Blue Cross Blue Shield" },
    { value: "caresource", label: "Care Source" },
    { value: "cigna", label: "Cigna" },
    { value: "humana", label: "Humana" },
    { value: "medicaid", label: "Medicaid" },
    { value: "medicare", label: "Medicare" },
    { value: "peachstate", label: "Peach State Health Plan" },
    { value: "unitedhealthcare", label: "UnitedHealthcare" },
    { value: "other", label: "Other" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      insuranceProvider: selectedOption
    });
  };

  // Custom validation function
  const validateForm = () => {
    const errors = {};

    // Validate required fields
    if (!formData.parentName) errors.parentName = "Parent's name is required.";
    if (!formData.childName) errors.childName = "Child's name is required.";
    if (!formData.age || formData.age <= 0) errors.age = "Age must be a positive number.";
    if (!formData.dob) errors.dob = "Date of birth is required.";
    if (!formData.email) errors.email = "Email address is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.dateOfLastEval) errors.dateOfLastEval = "Date of last evaluation is required.";
    if (!formData.behaviorsOfConcern) errors.behaviorsOfConcern = "Please describe the behaviors of concern.";

    // Simple email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Validate form data before submitting
    if (validateForm()) {
      handleSubmit(event);
    }
  };

  if (state.succeeded) {
    return <p>Thanks for submitting the form!</p>;
  }

  return (
    <>
    <Helmet>
  <title>Contact Mommy Angel's Specialty Care | ABA Therapy & Autism Support</title>
  <meta
    name="description"
    content="Reach out to Mommy Angel's Specialty Care and Autism Center for compassionate, specialized ABA therapy, speech therapy, and Pre-K readiness for children with autism in Georgia."
  />
  <meta
    name="keywords"
    content="ABA therapy, autism support, early childhood autism care, contact Mommy Angel's, Pre-K readiness, speech therapy Georgia, inclusive autism center"
  />
</Helmet>
    <FormContainer>
      <FormTitle>Intake Form</FormTitle>
      <Form
        name="contact" // The name here is important for Netlify
        method="POST"
        data-netlify="true" // This tells Netlify to handle the form
        netlify-honeypot="bot-field" // Anti-bot field
        onSubmit={onSubmit} // Handle submission in your JS logic
      >
        {/* Parent's Name */}
        <div>
          <Label htmlFor="parentName">Parent's Name</Label>
          <InputField
            type="text"
            name="parentName"
            placeholder="Enter Parent's Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
          {formErrors.parentName && <span>{formErrors.parentName}</span>}
        </div>

        {/* Child's Name */}
        <div>
          <Label htmlFor="childName">Child's Name</Label>
          <InputField
            type="text"
            name="childName"
            placeholder="Enter Child's Name"
            value={formData.childName}
            onChange={handleChange}
            required
          />
          {formErrors.childName && <span>{formErrors.childName}</span>}
        </div>

        {/* Child's Age */}
        <div>
          <Label htmlFor="age">Child's Age</Label>
          <InputField
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {formErrors.age && <span>{formErrors.age}</span>}
        </div>

        {/* Child's Date of Birth */}
        <div>
          <Label htmlFor="dob">Child's Date of Birth</Label>
          <InputField
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {formErrors.dob && <span>{formErrors.dob}</span>}
        </div>

        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email Address</Label>
          <InputField
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <InputField
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {formErrors.phone && <span>{formErrors.phone}</span>}
        </div>

        {/* Date of Last Evaluation */}
        <div>
          <Label htmlFor="dateOfLastEval">Date of Last Evaluation</Label>
          <InputField
            type="date"
            name="dateOfLastEval"
            value={formData.dateOfLastEval}
            onChange={handleChange}
            required
          />
          {formErrors.dateOfLastEval && <span>{formErrors.dateOfLastEval}</span>}
        </div>

        {/* Insurance Dropdown */}
        <div>
          <Label htmlFor="insuranceProvider">Select Your Insurance Provider</Label>
          <InsuranceDropdown>
            <Select
              options={insuranceOptions}
              value={formData.insuranceProvider}
              onChange={handleSelectChange}
              isSearchable
              placeholder="Search or select insurance..."
            />
          </InsuranceDropdown>
        </div>

        {/* Behaviors of Concern */}
        <div>
          <Label htmlFor="behaviorsOfConcern">Current Behaviors of Concern</Label>
          <TextAreaField
            name="behaviorsOfConcern"
            placeholder="Describe any current behaviors of concern"
            value={formData.behaviorsOfConcern}
            onChange={handleChange}
            required
          />
          {formErrors.behaviorsOfConcern && <span>{formErrors.behaviorsOfConcern}</span>}
        </div>

        {/* Submit Button */}
        <SubmitButton type="submit" disabled={state.submitting}>Submit</SubmitButton>

        <ConsentText>
          By submitting this form, you consent to the use and disclosure of your
          personal information as required to process your inquiry. We are
          committed to maintaining the privacy and security of your personal
          health information in compliance with HIPAA.
        </ConsentText>

        <input type="hidden" name="form-name" value="contact" />
      </Form>
    </FormContainer>
    </>
  );
}

export default ContactForm;
