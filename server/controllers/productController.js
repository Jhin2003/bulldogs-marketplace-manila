// controllers/productController.js
const Product = require("../models/Product"); // Import your Product model
const {User} = require("../models/User");
const ProductImage = require("../models/ProductImage");
const Category = require("../models/Category");
const { Op } = require("sequelize");
const Transaction = require("../models/Transaction")


const getProducts = async (req, res) => {
  const { search, categoryId, page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  try {
    const whereConditions = {};

    // Search filter for product name
    if (search) {
      whereConditions.name = {
        [Op.like]: `%${search}%`,
      };
    }

    // Category filter
    if (categoryId) {
      whereConditions.category_id = categoryId;
    }

    // Get all product IDs that are in transactions
    const transactionProductIds = await Transaction.findAll({
      attributes: ["product_id"], // Get only product_id column
      raw: true, // Get plain array instead of Sequelize instances
    });

    const productIdsInTransactions = transactionProductIds.map(
      (transaction) => transaction.product_id
    );

    // Exclude products that are in transactions
    if (productIdsInTransactions.length > 0) {
      whereConditions.id = {
        [Op.notIn]: productIdsInTransactions,
      };
    }

    // Fetch products with filters
    const { rows, count } = await Product.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: ProductImage,
          required: false,
          attributes: ["image_url"],
        },
        {
          model: User,
          required: true,
          attributes: ["id", "username", "email", "image_url"],
        },
        {
          model: Category,
          required: true,
          attributes: ["name"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const hasNextPage = page * limit < count;

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

const updateProduct = async (req, res) => {
  try {
    const {id } = req.params;
    const { name, price, description, categoryId } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    await product.update({
      name,
      price,
      description,
      categoryId,
    });

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProduct;


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



module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct};
