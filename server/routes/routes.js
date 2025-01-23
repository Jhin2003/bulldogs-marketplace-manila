const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

// Importing destructured functions directly from controllers
const { signupUser, loginUser } = require("../controllers/userController");
const { getProducts, getProductById, addProduct } = require("../controllers/productController");
const { getMessages } = require("../controllers/messageController");
const { getCategories } = require("../controllers/categoryController");

// User Routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Product Routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", upload.array("images"), addProduct);

// Message Routes
router.get("/messages/:userId", getMessages);

// Category Routes
router.get("/categories", getCategories);

module.exports = router;