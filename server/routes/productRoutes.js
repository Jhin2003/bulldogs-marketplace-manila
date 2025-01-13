const express = require('express');
const router = express.Router();

const { getAllProducts } = require('../controllers/productController');
// Fetch all products
router.get('/', getAllProducts);

// Add a new product
router.post('/', (req, res) => {
  const newProduct = req.body;
  res.json({ message: 'Product added', product: newProduct });
});

// Fetch a specific product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ message: `Product details for ID: ${productId}` });
});

// Update a product
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.json({ message: `Product ${productId} updated`, product: updatedProduct });
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ message: `Product ${productId} deleted` });
});

module.exports = router;