const express = require('express');
const upload = require('../utils/upload');
const path = require('path');

const router = express.Router();

// Error handling middleware for multer
const uploadMiddleware = (req, res, next) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      console.error('Multer error stack:', err.stack);
      return res.status(400).json({ 
        error: 'File upload error', 
        details: err.message 
      });
    }
    next();
  });
};

router.post('/', uploadMiddleware, (req, res) => {
  console.log('Upload route hit');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  console.log('Request headers:', req.headers);
  
  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      secure_url: req.file.secure_url
    });

    // Check if we're using Cloudinary (has secure_url) or local storage
    let imageUrl;
    if (req.file.secure_url) {
      // Cloudinary response
      imageUrl = req.file.secure_url;
      console.log('Using Cloudinary URL:', imageUrl);
    } else {
      // Local storage - create a full URL that can be accessed
      const fileName = path.basename(req.file.path);
      const backendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://cinebooking-jjwb.onrender.com'
        : 'http://localhost:5000';
      imageUrl = `${backendUrl}/uploads/${fileName}`;
      console.log('Using local URL:', imageUrl);
    }

    console.log('Sending response with imageUrl:', imageUrl);
    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

module.exports = router;
