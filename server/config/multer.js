const multer = require("multer");
const path = require("path");

// Function to dynamically determine storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = "public/images/"; // Base upload folder

    if (file.fieldname === "product_images") {
      uploadFolder += "productImages"; // Store product images here
    } else if (file.fieldname === "user_image") {
      uploadFolder += "userImages"; // Store user profile images here
    } else {
      return cb(new Error("Invalid field name"), false);
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter: Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer instances for different upload types
const uploadProductImages = multer({ storage, fileFilter }).array("product_images", 5); // Up to 5 images
const uploadUserImage = multer({ storage, fileFilter }).single("user_image"); // Single image

module.exports = { uploadProductImages, uploadUserImage };