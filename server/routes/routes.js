const express = require("express");
const router = express.Router();
const { uploadProductImages, uploadUserImage } = require("../config/multer");

const { authenticate } = require("../middleware/authMiddleware");


// Importing destructured functions directly from controllers
const { signupUser, loginUser, getUserById, updateUser, getUserProducts, getUserLikes, getUserReviews }= require("../controllers/userController");
const { getProducts, getProductById, addProduct, deleteProduct } = require("../controllers/productController");
const { getMessages, sendMessage} = require("../controllers/messageController");
const { getCategories } = require("../controllers/categoryController");
const {getLikeStatus, likeProduct, unlikeProduct} =  require("../controllers/likeController")


//USER ROLE ACCESS  ROUTES

// User Routes
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user/:id", authenticate, getUserById)
router.put('/user/:id', authenticate, uploadUserImage, updateUser)
router.get('/user/:id/products', getUserProducts)
router.get('/user/:id/likes', getUserLikes)
router.get('/user/:id/reviews', getUserReviews)

//product Routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", uploadProductImages, addProduct);
router.delete('/products/:id', deleteProduct)

// Message Routes
router.get("/messages/:userId", getMessages);
router.post("/messages/send", sendMessage); 
// Category Routes
router.get("/categories", getCategories);

//like Routes
router.get('/like/status', getLikeStatus);
router.post("/like", likeProduct )
router.delete("/like", unlikeProduct)





module.exports = router;