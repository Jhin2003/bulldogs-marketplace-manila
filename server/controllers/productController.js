// controllers/productController.js
const Product = require("../models/Product"); // Import your Product model
const {User} = require("../models/User");
const ProductImage = require("../models/ProductImage");
const Category = require("../models/Category");
const { Op } = require("sequelize");



const getProducts = async (req, res) => {
  const { search, categoryId, page = 1, limit = 10 } = req.query; // Destructure query params
   
  // Calculate the offset for pagination
  const offset = (page - 1) * limit;

  try {
    const whereConditions = {}; // Conditions for filtering

    // Search filter for product name
    if (search) {
      whereConditions.name = {
        [Op.like]: `%${search}%`, // Like search query for product name
      };
    }

    // Category filter
    if (categoryId) {
      whereConditions.category_id= categoryId; // Filter by categoryId if provided
    }

    // Fetch products with pagination, search, and category filter
    const { rows, count } = await Product.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: ProductImage,
          required: false, // Optional: Products without images will also be included
          attributes: ["image_url"], // Specify columns to include
        },
        {
          model: User,
          required: true, // Optional: Only include products with associated users
          attributes: ["id", "username", "email", "image_url"], // User attributes to include
        },
        {
          model: Category,
          required: true, // Optional: Only products that have an associated category
          attributes: ["name"], // Category name (you can include more attributes if needed)
        },
      ],
      limit: parseInt(limit), // Set the maximum number of records to return
      offset: parseInt(offset), // Set the number of records to skip
    });

    // Determine if there's a next page
    const hasNextPage = page * limit < count;

    // Send the paginated products as a response
    res.json({
      data: rows,
      totalCount: count,
      hasNextPage,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
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
        {
          model: Category,
          required: true, // Optional: Only products that have an associated category
          attributes: ["name"], // Category name (you can include more attributes if needed)
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

// DELETE endpoint to delete a product by its ID

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id); // Find the product by primary key (ID)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy(); // Delete the product from the database

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



module.exports = { getProducts, getProductById, addProduct, deleteProduct};
