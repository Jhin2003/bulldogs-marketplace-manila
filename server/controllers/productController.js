// controllers/productController.js
const Product = require('../models/Product');  // Import your Product model
const ProductImage = require('../models/ProductImage');

// Controller function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    console.log("tite")
    const products = await Product.findAll({
        include: [{
            model: ProductImage,
            required: false, // Optional, if you want to include products without images
          }]
  });  // Retrieve all products
    console.log(products)
    res.json(products);  // Send products as a JSON response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

module.exports = { getAllProducts };