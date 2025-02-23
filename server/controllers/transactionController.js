const  Transaction  = require("../models/Transaction");
const  Product = require("../models/Product");
const ProductImage = require("../models/ProductImage")
const {User} = require("../models/User")
const Category = require("../models/Category")

const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
// Create a new transaction
const addTransaction = async (req, res) => {
  try {
    const { seller_id, buyer_id, product_id } = req.body;

    if (!seller_id || !buyer_id || !product_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transaction = await Transaction.create({ seller_id, buyer_id, product_id });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    return res.status(500).json({ error: "Server error" });
  }
};




async function getTrendingWord(req, res) {
  try {
    // Step 1: Get Sold Products
    const soldProducts = await Transaction.findAll({
      attributes: [],
      include: [
        {
          model: Product,
          attributes: ["id", "name"], // Include 'id' to use later
        },
      ],
    });

    // Step 2: Extract Product Names
    const productNames = soldProducts.map((t) => t.Product.name);

    // Step 3: Count Occurrences of Each Word
    const wordCounts = {};
    productNames.forEach((name) => {
      const words = name.split(/\s+/); // Split by spaces
      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    });

    // Step 4: Find the Most Common Word
    const trendingWord = Object.keys(wordCounts).reduce((a, b) =>
      wordCounts[a] > wordCounts[b] ? a : b
    );

    // Step 5: Fetch Products Containing the Trending Word
    const trendingProducts = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${trendingWord}%`, // Search for products containing the word
        },
      },
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
    });

    // Step 6: Return the Trending Word & Matching Products
    return res.json({ trendingWord, trendingProducts });

  } catch (error) {
    console.error("Error fetching trending word:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {addTransaction, getTrendingWord}