// server.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dkt3rfpgz',
  api_key: process.env.CLOUDINARY_API_KEY || '825467336823896',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'zER4YhDEw-SJogewHRNTb9GvmYQ'
});

// Log Cloudinary configuration (sanitized)
console.log("Cloudinary Configuration:");
console.log("- Cloud name:", process.env.CLOUDINARY_CLOUD_NAME || 'dkt3rfpgz');
console.log("- API key configured:", !!process.env.CLOUDINARY_API_KEY || true);
console.log("- API secret configured:", !!process.env.CLOUDINARY_API_SECRET || true);

const app = express();

// Configure CORS with more logging
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    callback(null, true); // Allow all origins for now
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Body size: ${req.get('content-length') || 0} bytes`);
  next();
});

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Endpoint for uploading single images
app.post('/api/upload', upload.single('file'), async (req, res) => {
  console.log("Single upload request received");
  
  try {
    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("File received:", {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Create a Buffer from the file data
    const fileBuffer = req.file.buffer;
    const uploadPreset = req.body.upload_preset || 'portfolio';
    
    console.log("Upload preset:", uploadPreset);

    // Upload to Cloudinary using stream upload
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'portfolio',
          upload_preset: uploadPreset
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload success:", result.public_id);
            resolve(result);
          }
        }
      );

      // Pass buffer to the upload stream
      uploadStream.end(fileBuffer);
    });

    const result = await uploadPromise;
    console.log("Sending successful response with URL:", result.secure_url);
    
    res.json({ 
      secure_url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error details:', error.message);
    if (error.http_code) {
      console.error('Cloudinary HTTP code:', error.http_code);
    }
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

// Endpoint for uploading multiple images
app.post('/api/upload-multiple', upload.array('files', 10), async (req, res) => {
  console.log("Multiple upload request received");
  
  try {
    if (!req.files || req.files.length === 0) {
      console.error("No files in request");
      return res.status(400).json({ error: 'No files uploaded' });
    }

    console.log(`Received ${req.files.length} files`);
    
    // Log each file
    req.files.forEach((file, index) => {
      console.log(`File ${index + 1}:`, {
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      });
    });

    const uploadPreset = req.body.upload_preset || 'portfolio';
    console.log("Upload preset:", uploadPreset);

    const uploadPromises = req.files.map((file, index) => {
      return new Promise((resolve, reject) => {
        console.log(`Starting upload for file ${index + 1}`);
        
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: 'portfolio',
            upload_preset: uploadPreset
          },
          (error, result) => {
            if (error) {
              console.error(`Error uploading file ${index + 1}:`, error);
              reject(error);
            } else {
              console.log(`Successfully uploaded file ${index + 1}:`, result.public_id);
              resolve(result);
            }
          }
        );
        
        uploadStream.end(file.buffer);
      });
    });

    console.log("Waiting for all uploads to complete...");
    const results = await Promise.all(uploadPromises);
    
    console.log("All uploads completed successfully");
    res.json(results.map(result => ({
      secure_url: result.secure_url,
      public_id: result.public_id
    })));
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error details:', error.message);
    if (error.http_code) {
      console.error('Cloudinary HTTP code:', error.http_code);
    }
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

// Endpoint to fetch uploaded images from Cloudinary
app.get('/api/fetch-images', async (req, res) => {
  try {
    console.log("Fetching uploaded images from Cloudinary...");
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'portfolio', // Fetch images from the 'portfolio' folder
      max_results: 100, // Limit the number of results
    });

    const imageUrls = resources.map(resource => ({
      secure_url: resource.secure_url,
      public_id: resource.public_id,
      created_at: resource.created_at, // Include created_at for grouping
    }));

    console.log("Successfully fetched images:", imageUrls);
    res.json(imageUrls);
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    res.status(500).json({ error: 'Failed to fetch images', details: error.message });
  }
});

// Endpoint to test Cloudinary connection
app.get('/api/test-cloudinary', async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary ping result:", result);
    res.json({ status: 'Cloudinary connection successful', result });
  } catch (error) {
    console.error("Cloudinary connection error:", error);
    res.status(500).json({ error: 'Cloudinary connection failed', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toISOString()}`);
  console.log(`API endpoints:
  - POST /api/upload (single file)
  - POST /api/upload-multiple (multiple files)
  - GET /api/fetch-images (fetch uploaded images)
  - GET /api/test-cloudinary (test connection)
  - GET /api/health (health check)`);
});