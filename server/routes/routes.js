const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

// Importing destructured functions directly from controllers
const { signupUser, loginUser, getUserProducts, getUserLikes} = require("../controllers/userController");
const { getProducts, getProductById, addProduct } = require("../controllers/productController");
const { getMessages } = require("../controllers/messageController");
const { getCategories } = require("../controllers/categoryController");
const {getLikeStatus, likeProduct, unlikeProduct} =  require("../controllers/likeController")

// User Routes
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get('/user/:id/products', getUserProducts)
router.get('/user/:id/likes', getUserLikes)


router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", upload.array("images"), addProduct);

// Message Routes
router.get("/messages/:userId", getMessages);

// Category Routes
router.get("/categories", getCategories);

//like Routes

router.get('/like/status', getLikeStatus);
router.post("/like", likeProduct )
router.delete("/like", unlikeProduct)

module.exports = router;