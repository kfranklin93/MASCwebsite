// ================================================================
// EMPLOYEE DOCUMENT UPLOAD PORTAL
// Token-based access for employees to upload required documents
// ================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { employeeAPI } from '../../services/api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const FormCard = styled.div`
  max-width: 900px;
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

const Content = styled.div`
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

const DocumentList = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
`;

const DocumentItem = styled.div`
  padding: 20px;
  border: 2px solid ${({ $uploaded }) => $uploaded ? '#48bb78' : '#e2e8f0'};
  border-radius: 12px;
  background: ${({ $uploaded }) => $uploaded ? '#f0fff4' : '#f7fafc'};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ $uploaded }) => $uploaded ? '#48bb78' : '#cbd5e0'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
  }
`;

const DocumentStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $status }) => {
    switch ($status) {
      case 'uploaded': return '#38a169';
      case 'pending': return '#d69e2e';
      case 'expired': return '#e53e3e';
      default: return '#718096';
    }
  }};
  
  &::before {
    content: '●';
    font-size: 12px;
  }
`;

const DocumentDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
`;

const DropzoneArea = styled.div`
  border: 2px dashed ${({ $isDragActive, $hasFile }) => 
    $hasFile ? '#48bb78' : $isDragActive ? '#667eea' : '#cbd5e0'
  };
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isDragActive, $hasFile }) => 
    $hasFile ? '#f0fff4' : $isDragActive ? '#eef2ff' : 'white'
  };
  
  &:hover {
    border-color: #667eea;
    background: #eef2ff;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #4a5568;
  }
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-top: 12px;
  
  .file-details {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .file-icon {
      font-size: 24px;
    }
    
    .file-name {
      font-size: 14px;
      font-weight: 600;
      color: #2d3748;
    }
    
    .file-size {
      font-size: 12px;
      color: #718096;
    }
  }
  
  button {
    padding: 6px 12px;
    background: #e53e3e;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:hover {
      background: #c53030;
    }
  }
`;

const UploadProgress = styled.div`
  margin-top: 12px;
  
  .progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    margin-top: 8px;
    font-size: 12px;
    color: #718096;
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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

const REQUIRED_DOCUMENTS = [
  {
    id: 'application',
    name: 'Employment Application',
    description: 'Completed employment application form with references',
    required: true
  },
  {
    id: 'id_documents',
    name: 'I-9 Form & Valid ID',
    description: 'I-9 employment eligibility form with copies of valid government-issued ID (driver\'s license, passport, etc.)',
    required: true
  },
  {
    id: 'rbt_certificate',
    name: 'RBT Certificate',
    description: 'Current Registered Behavior Technician (RBT) certification from BACB',
    required: true
  },
  {
    id: 'cpr_firstaid',
    name: 'CPR & First Aid Certification',
    description: 'Current CPR and First Aid certification (American Red Cross or equivalent)',
    required: true
  },
  {
    id: 'background_check',
    name: 'Background Check Authorization',
    description: 'Signed background check consent form',
    required: true
  },
  {
    id: 'tb_test',
    name: 'TB Test Results',
    description: 'Tuberculosis test results from the last 12 months',
    required: false
  },
  {
    id: 'vaccination_records',
    name: 'Vaccination Records',
    description: 'COVID-19 vaccination card and other relevant immunization records',
    required: false
  },
  {
    id: 'references',
    name: 'Professional References',
    description: 'Contact information for 2-3 professional references',
    required: false
  },
  {
    id: 'resume',
    name: 'Resume/CV',
    description: 'Current resume or curriculum vitae',
    required: false
  },
  {
    id: 'other',
    name: 'Other Documents',
    description: 'Any additional documents (transcripts, licenses, certifications, etc.)',
    required: false
  }
];

const DocumentUpload = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [documents, setDocuments] = useState({});
  const [uploadingDocs, setUploadingDocs] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadEmployeeData();
  }, [token]);

  const loadEmployeeData = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getEmployee(token);
      
      if (response.success && response.data) {
        setEmployee(response.data);
        // Initialize documents state
        const docsState = {};
        REQUIRED_DOCUMENTS.forEach(doc => {
          docsState[doc.id] = null;
        });
        setDocuments(docsState);
      } else {
        setError('Unable to load employee information. Please check your link.');
      }
    } catch (err) {
      setError('Invalid or expired upload link. Please contact HR for assistance.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileDrop = useCallback((docId, acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} is too large. Maximum file size is 10MB.`);
        return;
      }
      
      setDocuments(prev => ({
        ...prev,
        [docId]: file
      }));
      
      setError(null);
    }
  }, []);

  const removeFile = (docId) => {
    setDocuments(prev => ({
      ...prev,
      [docId]: null
    }));
  };

  const uploadDocument = async (docId) => {
    const file = documents[docId];
    if (!file) return;

    try {
      setUploadingDocs(prev => ({ ...prev, [docId]: true }));
      setUploadProgress(prev => ({ ...prev, [docId]: 0 }));
      setError(null);

      const formData = new FormData();
      formData.append('document', file);
      formData.append('document_type', docId);

      const response = await employeeAPI.uploadDocument(token, formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(prev => ({ ...prev, [docId]: percentCompleted }));
      });

      if (response.success) {
        setSuccess(`${REQUIRED_DOCUMENTS.find(d => d.id === docId).name} uploaded successfully!`);
        setTimeout(() => setSuccess(null), 3000);
        
        // Clear the file after successful upload
        removeFile(docId);
      }
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploadingDocs(prev => ({ ...prev, [docId]: false }));
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [docId]: 0 }));
      }, 2000);
    }
  };

  const uploadAllDocuments = async () => {
    const docsToUpload = Object.entries(documents).filter(([_, file]) => file !== null);
    
    for (const [docId, _] of docsToUpload) {
      await uploadDocument(docId);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return <LoadingSpinner $fullPage />;
  }

  if (!employee) {
    return (
      <PageContainer>
        <FormCard>
          <Header>
            <h1>⚠️ Invalid Link</h1>
            <p>Unable to access document upload portal</p>
          </Header>
          <Content>
            <ErrorMessage>
              {error || 'This link is invalid or has expired. Please contact HR for assistance.'}
            </ErrorMessage>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </Content>
        </FormCard>
      </PageContainer>
    );
  }

  const requiredDocs = REQUIRED_DOCUMENTS.filter(d => d.required);
  const optionalDocs = REQUIRED_DOCUMENTS.filter(d => !d.required);
  const readyToUpload = Object.values(documents).some(file => file !== null);

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <h1>📄 Employee Document Upload</h1>
          <p>Welcome, {employee.first_name}! Please upload your required documents</p>
        </Header>

        <Content>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage><h3>✓ {success}</h3></SuccessMessage>}

          <Section>
            <h2>Required Documents</h2>
            <DocumentList>
              {requiredDocs.map(doc => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  file={documents[doc.id]}
                  uploading={uploadingDocs[doc.id]}
                  progress={uploadProgress[doc.id]}
                  onDrop={handleFileDrop}
                  onRemove={removeFile}
                  onUpload={uploadDocument}
                />
              ))}
            </DocumentList>
          </Section>

          <Section>
            <h2>Optional Documents</h2>
            <DocumentList>
              {optionalDocs.map(doc => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  file={documents[doc.id]}
                  uploading={uploadingDocs[doc.id]}
                  progress={uploadProgress[doc.id]}
                  onDrop={handleFileDrop}
                  onRemove={removeFile}
                  onUpload={uploadDocument}
                />
              ))}
            </DocumentList>
          </Section>

          {readyToUpload && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <Button $variant="primary" onClick={uploadAllDocuments}>
                Upload All Documents
              </Button>
            </div>
          )}
        </Content>
      </FormCard>
    </PageContainer>
  );
};

const DocumentCard = ({ document, file, uploading, progress, onDrop, onRemove, onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onDrop(document.id, files),
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <DocumentItem $uploaded={!!file}>
      <DocumentHeader>
        <h3>
          {document.required && <span style={{ color: '#e53e3e' }}>* </span>}
          {document.name}
        </h3>
        {file && <DocumentStatus $status="pending">Ready to Upload</DocumentStatus>}
      </DocumentHeader>
      
      <DocumentDescription>{document.description}</DocumentDescription>
      
      {!file ? (
        <DropzoneArea {...getRootProps()} $isDragActive={isDragActive} $hasFile={!!file}>
          <input {...getInputProps()} />
          <div className="icon">📁</div>
          {isDragActive ? (
            <p><strong>Drop file here...</strong></p>
          ) : (
            <>
              <p><strong>Drag & drop file here</strong></p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}>
                or click to browse • Max 10MB • PDF, JPG, PNG, DOC
              </p>
            </>
          )}
        </DropzoneArea>
      ) : (
        <>
          <FileInfo>
            <div className="file-details">
              <span className="file-icon">📎</span>
              <div>
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
            </div>
            <button onClick={() => onRemove(document.id)}>Remove</button>
          </FileInfo>
          
          {uploading && (
            <UploadProgress>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-text">Uploading... {progress}%</div>
            </UploadProgress>
          )}
          
          {!uploading && (
            <Button 
              $variant="primary" 
              onClick={() => onUpload(document.id)}
              style={{ marginTop: '12px', width: '100%' }}
            >
              Upload {document.name}
            </Button>
          )}
        </>
      )}
    </DocumentItem>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default DocumentUpload;
