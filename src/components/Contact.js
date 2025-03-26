import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios'; // ✅ Import Axios for API calls

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
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3B7DC4;
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

const insuranceOptions = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'ambetter', label: 'Ambetter' },
  { value: 'amerigroup', label: 'Amerigroup' },
  { value: 'bluecross', label: 'Blue Cross Blue Shield' },
  { value: 'caresource', label: 'Care Source' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'humana', label: 'Humana' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'peachstate', label: 'Peach State Health Plan' },
  { value: 'unitedhealthcare', label: 'UnitedHealthcare' },
  { value: 'other', label: 'Other' }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    age: '',
    dob: '',
    email: '',
    phone: '',
    insuranceProvider: null,
    behaviorsOfConcern: '',
    dateOfLastEval: '', // Added field for Date of Last Evaluation
  });

  const [status] = useState(""); // ✅ For displaying success/error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, insuranceProvider: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://mommy-angels-test.firebaseapp.com/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("✅ Email sent successfully!!");
      } else {
        alert("❌ Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("❌ Failed to send email. Please try again.");
    }
  };

  return (
    <FormContainer>
      <FormTitle>Contact Us</FormTitle>
      <Form onSubmit={handleSubmit}>
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
        </div>
        
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
        </div>

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
        </div>

        <div>
          <Label htmlFor="dob">Child's Date of Birth</Label>
          <InputField
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

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
        </div>

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
        </div>

        {/* Date of Last Evaluation Field */}
        <div>
          <Label htmlFor="dateOfLastEval">Date of Last Evaluation</Label>
          <InputField
            type="date"
            name="dateOfLastEval"
            value={formData.dateOfLastEval}
            onChange={handleChange}
            required
          />
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

        <div>
          <Label htmlFor="behaviorsOfConcern">Current Behaviors of Concern</Label>
          <TextAreaField
            name="behaviorsOfConcern"
            placeholder="Describe any current behaviors of concern"
            value={formData.behaviorsOfConcern}
            onChange={handleChange}
            required
          />
        </div>

        <SubmitButton type="submit">Submit</SubmitButton>

        <p>{status}</p> {/* ✅ Display success or error message */}

        <ConsentText>
          By submitting this form, you consent to the use and disclosure of your personal information as required to process your inquiry. We are committed to maintaining the privacy and security of your personal health information in compliance with HIPAA. Please do not include sensitive health information, such as medical conditions or treatment details, as this form is not intended for secure communication of protected health information (PHI). For more secure communication, please contact us directly by phone.
        </ConsentText>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
