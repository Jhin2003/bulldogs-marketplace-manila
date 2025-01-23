// config/multer.js
const multer = require('multer');
const path = require('path');

// Set storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the folder to store the uploaded files
    cb(null, 'public/images/productImages'); // Save to 'public/images' folder
  },
  filename: (req, file, cb) => {
    // Ensure the file name is unique by appending a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer instance with the storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow image file types (optional)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

module.exports = upload;