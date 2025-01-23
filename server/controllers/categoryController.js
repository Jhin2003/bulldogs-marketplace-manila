const  Category  = require("../models/Category"); // Import the Category model

// Controller method to get all categories
const getCategories = async (req, res) => {
  try {

    // Fetch all categories from the database
    const categories = await Category.findAll();

    // Return the categories in JSON format
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getCategories,
};
