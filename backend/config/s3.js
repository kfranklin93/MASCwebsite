// ================================================================
// AWS S3 CONFIGURATION
// File upload and storage configuration
// ================================================================

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Multer S3 configuration for employee documents
const uploadEmployeeDocument = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'private', // Keep files private, use pre-signed URLs
        contentType: multerS3.AUTO_CONTENT_TYPE,
        serverSideEncryption: 'AES256', // HIPAA compliance - encrypt at rest
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname,
                uploadedBy: req.user ? req.user.id : 'system',
                uploadedAt: new Date().toISOString()
            });
        },
        key: (req, file, cb) => {
            const employeeId = req.params.employeeId || req.body.employeeId;
            const documentType = req.body.documentType || 'other';
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uuidv4()}${fileExtension}`;
            const key = `employees/${employeeId}/${documentType}/${fileName}`;
            cb(null, key);
        }
    }),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept only PDFs, images
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'), false);
        }
    }
});

// Generate pre-signed URL for secure file access (expires in 1 hour)
const getSignedUrl = (key, expiresIn = 3600) => {
    return s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: key,
        Expires: expiresIn
    });
};

// Delete file from S3
const deleteFile = async (key) => {
    try {
        await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: key
        }).promise();
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
};

// List files in a folder
const listFiles = async (prefix) => {
    try {
        const response = await s3.listObjectsV2({
            Bucket: BUCKET_NAME,
            Prefix: prefix
        }).promise();
        return response.Contents;
    } catch (error) {
        console.error('Error listing files from S3:', error);
        throw error;
    }
};

// Copy file within S3
const copyFile = async (sourceKey, destinationKey) => {
    try {
        await s3.copyObject({
            Bucket: BUCKET_NAME,
            CopySource: `${BUCKET_NAME}/${sourceKey}`,
            Key: destinationKey
        }).promise();
        return true;
    } catch (error) {
        console.error('Error copying file in S3:', error);
        throw error;
    }
};

module.exports = {
    s3,
    uploadEmployeeDocument,
    getSignedUrl,
    deleteFile,
    listFiles,
    copyFile,
    BUCKET_NAME
};
