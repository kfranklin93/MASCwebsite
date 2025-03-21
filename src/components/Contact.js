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
  });

  const [status, setStatus] = useState(""); // ✅ For displaying success/error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, insuranceProvider: selectedOption });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("Sending...");

  //   try {
  //     const response = await axios.post("http://localhost:5000/send-email", formData);
  //     if (response.data.success) {
  //       setStatus("✅ Email sent successfully!");
  //       setFormData({
  //         parentName: '',
  //         childName: '',
  //         age: '',
  //         dob: '',
  //         email: '',
  //         phone: '',
  //         insuranceProvider: null,
  //         behaviorsOfConcern: '',
  //       }); // Reset form
  //     }
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     setStatus("❌ Failed to send email. Please try again.");
  //   }
  // };
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
        <InputField
          type="text"
          name="parentName"
          placeholder="Name of Parent"
          value={formData.parentName}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="childName"
          placeholder="Name of Child"
          value={formData.childName}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <InputField
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Searchable Insurance Dropdown */}
        <InsuranceDropdown>
          <label>Select Your Insurance Provider:</label>
          <Select
            options={insuranceOptions}
            value={formData.insuranceProvider}
            onChange={handleSelectChange}
            isSearchable
            placeholder="Search or select insurance..."
          />
        </InsuranceDropdown>
        
        <TextAreaField
          name="behaviorsOfConcern"
          placeholder="Current Behaviors of Concern"
          value={formData.behaviorsOfConcern}
          onChange={handleChange}
          required
        />

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
