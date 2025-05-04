const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for PDF storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use absolute path to ensure correct directory
    const uploadPath = path.resolve(__dirname, '../../frontend/public/pdf');
    console.log('Upload path:', uploadPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Ensure unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, true); // Accept all files for now since we're sending blob
    }
  }
});

// Route to save PDF
router.post('/save-pdf', upload.single('file'), (req, res) => {
  try {
    console.log('Received file:', req.file);
    
    if (!req.file) {
      console.error('No file received');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File saved successfully:', req.file.path);
    
    res.json({ 
      message: 'PDF saved successfully',
      filename: req.file.filename,
      path: `/pdf/${req.file.filename}` // Return relative path for frontend
    });
  } catch (error) {
    console.error('Error saving PDF:', error);
    res.status(500).json({ message: 'Error saving PDF', error: error.message });
  }
});

module.exports = router; 