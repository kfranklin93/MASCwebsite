import React, { useState } from "react";
import { useForm } from "@formspree/react";
import styled from "styled-components";
import Select from "react-select";
import { Helmet } from "react-helmet-async";

const PageContainer = styled.div`
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  min-height: 100vh;
  padding: 4rem 0;
`;

const FormContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #cd1b1b, #4a90e2, #ffd700);
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2.8rem;
  color: #cd1b1b;
  margin-bottom: 1rem;
  font-family: "Bubblegum Sans", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormSubtitle = styled.p`
  font-size: 1.2rem;
  color: #00695c;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  font-family: "Nunito", sans-serif;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
`;

const InputField = styled.input`
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  font-family: "Nunito", sans-serif;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
    outline: none;
  }

  &:hover {
    border-color: #4a90e2;
  }
`;

const TextAreaField = styled.textarea`
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  font-family: "Nunito", sans-serif;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
    outline: none;
  }

  &:hover {
    border-color: #4a90e2;
  }
`;

const ErrorMessage = styled.span`
  color: #cd1b1b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  font-family: "Nunito", sans-serif;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #cd1b1b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    background: #e62020;
    box-shadow: 0 4px 12px rgba(205, 27, 27, 0.2);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ConsentText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 1.5rem;
  text-align: center;
  grid-column: 1 / -1;
  font-family: "Nunito", sans-serif;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 10px;
`;

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    border: `2px solid ${state.isFocused ? "#4A90E2" : "#e1e1e1"}`,
    padding: "0.25rem",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(74, 144, 226, 0.1)" : "none",
    "&:hover": {
      borderColor: "#4A90E2",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4A90E2"
      : state.isFocused
      ? "rgba(74, 144, 226, 0.1)"
      : "white",
    color: state.isSelected ? "white" : "#333",
    padding: "0.75rem 1rem",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  }),
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xkgjkjng");
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    age: "",
    dob: "",
    email: "",
    phone: "",
    dateOfLastEval: "",
    insuranceProvider: null,
    secondaryInsurance: null,
    behaviorsOfConcern: "",
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
    // { value: "peachstate", label: "Peach State Health Plan" },
    { value: "unitedhealthcare", label: "UnitedHealthcare" },
    // { value: "other", label: "Other" },
  ];

  const secondaryInsuranceOptions = [
    { value: "na", label: "N/A" },
    ...insuranceOptions,
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      insuranceProvider: selectedOption,
    });
  };

  const handleSecondaryInsuranceChange = (selectedOption) => {
    setFormData({
      ...formData,
      secondaryInsurance: selectedOption,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.parentName) errors.parentName = "Parent's name is required.";
    if (!formData.childName) errors.childName = "Child's name is required.";
    if (!formData.age || formData.age <= 0) {
      errors.age = "Age must be a positive number.";
    } else {
      const age = parseFloat(formData.age);
      if (age < 2 || age > 6) {
        const confirmProceed = window.confirm(
          "Thank you so much for your interest! Our program is specially designed for children ages 2 to 6 years old. 😊\n\n" +
            "If your child is a bit younger or older, no worries — we warmly recommend reaching out to our trusted partners at " +
            "Flourish Pediatrics (https://flourishpediatrics.com) for a personalized referral and support. We want to make sure your child gets the best possible care!"
        );
        if (!confirmProceed) {
          return false;
        }
      }
    }
    if (!formData.dob) errors.dob = "Date of birth is required.";
    if (!formData.email) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.dateOfLastEval)
      errors.dateOfLastEval = "Date of last evaluation is required.";
    if (!formData.behaviorsOfConcern)
      errors.behaviorsOfConcern = "Please describe the behaviors of concern.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit({
        ...formData,
        insuranceProvider: formData.insuranceProvider?.label ?? "",
        secondaryInsurance: formData.secondaryInsurance?.label ?? "",
      });
    }
  };

  if (state.succeeded) {
    return (
      <PageContainer>
        <FormContainer>
          <FormHeader>
            <FormTitle>Thank You!</FormTitle>
            <FormSubtitle>
              We've received your information and will contact you soon to
              discuss the next steps in your child's journey with us.
            </FormSubtitle>
          </FormHeader>
        </FormContainer>
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Contact Mommy Angel's Specialty Care | ABA Therapy & Autism Support
        </title>
        <meta
          name="description"
          content="Reach out to Mommy Angel's Specialty Care and Autism Center for compassionate, specialized ABA therapy, speech therapy, and Pre-K readiness for children with autism in Georgia."
        />
        <meta
          name="keywords"
          content="ABA therapy, autism support, early childhood autism care, contact Mommy Angel's, Pre-K readiness, speech therapy Georgia, inclusive autism center"
        />
      </Helmet>
      <PageContainer>
        <FormContainer>
          <FormHeader>
            <FormTitle>Start Your Journey With Us</FormTitle>
            <FormSubtitle>
              We're here to support you every step of the way. Fill out this
              form to begin your child's journey toward growth and development
              in our nurturing environment.
            </FormSubtitle>
          </FormHeader>

          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label htmlFor="parentName">Parent's Name</Label>
              <InputField
                type="text"
                id="parentName"
                name="parentName"
                aria-invalid={formErrors.parentName ? "true" : "false"}
                aria-describedby={formErrors.parentName ? "parentName-error" : undefined}
                placeholder="Enter parent's name"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
              {formErrors.parentName && (
                <ErrorMessage id="parentName-error" role="alert">{formErrors.parentName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="childName">Child's Name</Label>
              <InputField
                type="text"
                id="childName"
                name="childName"
                aria-invalid={formErrors.childName ? "true" : "false"}
                aria-describedby={formErrors.childName ? "childName-error" : undefined}
                placeholder="Enter child's name"
                value={formData.childName}
                onChange={handleChange}
                required
              />
              {formErrors.childName && (
                <ErrorMessage id="childName-error" role="alert">{formErrors.childName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="age">Child's Age</Label>
              <InputField
                type="number"
                id="age"
                name="age"
                aria-invalid={formErrors.age ? "true" : "false"}
                aria-describedby={formErrors.age ? "age-error" : undefined}
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              {formErrors.age && <ErrorMessage id="age-error" role="alert">{formErrors.age}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dob">Date of Birth</Label>
              <InputField
                type="date"
                id="dob"
                name="dob"
                aria-invalid={formErrors.dob ? "true" : "false"}
                aria-describedby={formErrors.dob ? "dob-error" : undefined}
                value={formData.dob}
                onChange={handleChange}
                required
              />
              {formErrors.dob && <ErrorMessage id="dob-error" role="alert">{formErrors.dob}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputField
                type="email"
                id="email"
                name="email"
                aria-invalid={formErrors.email ? "true" : "false"}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <ErrorMessage id="email-error" role="alert">{formErrors.email}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <InputField
                type="tel"
                id="phone"
                name="phone"
                aria-invalid={formErrors.phone ? "true" : "false"}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && (
                <ErrorMessage id="phone-error" role="alert">{formErrors.phone}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dateOfLastEval">Date of Last Evaluation</Label>
              <InputField
                type="date"
                id="dateOfLastEval"
                name="dateOfLastEval"
                aria-invalid={formErrors.dateOfLastEval ? "true" : "false"}
                aria-describedby={formErrors.dateOfLastEval ? "dateOfLastEval-error" : undefined}
                value={formData.dateOfLastEval}
                onChange={handleChange}
                required
              />
              {formErrors.dateOfLastEval && (
                <ErrorMessage id="dateOfLastEval-error" role="alert">{formErrors.dateOfLastEval}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Select
                id="insuranceProvider"
                options={insuranceOptions}
                value={formData.insuranceProvider}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Search or select insurance..."
                styles={customSelectStyles}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="secondaryInsurance">Secondary Insurance <span style={{ fontWeight: 400, color: "#888" }}>(Optional)</span></Label>
              <Select
                id="secondaryInsurance"
                options={secondaryInsuranceOptions}
                value={formData.secondaryInsurance}
                onChange={handleSecondaryInsuranceChange}
                isSearchable
                isClearable
                placeholder="Search or select secondary insurance..."
                styles={customSelectStyles}
              />
            </FormGroup>

            <FullWidthGroup>
              <Label htmlFor="behaviorsOfConcern">
                Current Behaviors of Concern
              </Label>
              <TextAreaField
                id="behaviorsOfConcern"
                name="behaviorsOfConcern"
                aria-invalid={formErrors.behaviorsOfConcern ? "true" : "false"}
                aria-describedby={formErrors.behaviorsOfConcern ? "behaviorsOfConcern-error" : undefined}
                placeholder="Please describe any behaviors or concerns you'd like to address..."
                value={formData.behaviorsOfConcern}
                onChange={handleChange}
                required
              />
              {formErrors.behaviorsOfConcern && (
                <ErrorMessage id="behaviorsOfConcern-error" role="alert">{formErrors.behaviorsOfConcern}</ErrorMessage>
              )}
            </FullWidthGroup>

            <SubmitButton type="submit" disabled={state.submitting}>
              {state.submitting ? "Sending..." : "Submit Application"}
            </SubmitButton>

            <ConsentText>
              By submitting this form, you consent to the use and disclosure of
              your personal information as required to process your inquiry. We
              are committed to maintaining the privacy and security of your
              personal health information in compliance with HIPAA.
            </ConsentText>

            <input type="hidden" name="form-name" value="contact" />
          </Form>
        </FormContainer>
      </PageContainer>
    </>
  );
};

export default ContactForm;
