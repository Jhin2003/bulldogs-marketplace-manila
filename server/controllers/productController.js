// controllers/productController.js
const Product = require("../models/Product"); // Import your Product model
const User = require("../models/User");
const ProductImage = require("../models/ProductImage");
const Category = require("../models/Category");

// Controller function to fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          required: false, // Optional, if you want to include products without images
        },
        {
          model: User, // Include the User model
          required: true, // Optional: If you want only products that have an associated user
          attributes: ["id", "username", "email", "image_url"], // Specify the attributes to include (optional)
        },
        {
          model: Category,
          required: true,
        },
      ],
    }); // Retrieve all products
    console.log(products);
    res.json(products); // Send products as a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters

    const product = await Product.findOne({
      where: { id }, // Filter by product ID
      include: [
        {
          model: ProductImage,
          required: false, // Include images if they exist
        },
        {
          model: User, // Include the User model
          required: true, // Only include products with associated users
          attributes: ["id", "username", "email", "image_url"], // Specify user attributes
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // Send the found product as a JSON response
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Error fetching product by ID" });
  }
};

const addProduct = async (req, res) => {
  const { name, price, description, categoryId, userId } = req.body;

  const category_id = categoryId;
  const user_id = userId;
  const images = req.files; // This will be an array of uploaded files

  try {
    // Step 1: Create a new product entry
    const product = await Product.create({
      name,
      price,
      description,
      category_id,
      user_id,
    });

    // Step 2: If images are provided, create product image entries
    if (images && images.length > 0) {
      const productImages = images.map((image, index) => ({
        product_id: product.id, // Associate the image with the created product
        image_url: `/images/productImages/${image.filename}`, // URL path to the image, stored in public/images folder
        is_primary: index === 0 ? 1 : 0, // Set the first image as primary (1), others as non-primary (0)
      }));

      // Create product images in the database
      await ProductImage.bulkCreate(productImages);
    }

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

module.exports = { getProducts, getProductById, addProduct };
