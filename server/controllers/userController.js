const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product")
const Likes = require("../models/Like")
const ProductImage = require("../models/ProductImage")
const Category = require("../models/Category")


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);
  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email }, // Searching for the user by email
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is correct, you can return the user data or generate a JWT token
    // Example: Send the user data (excluding password) in the response
    const { password: _, ...userData } = user.toJSON(); // Exclude password from the response
    return res.status(200).json(
      userData // Send user data excluding password
    );
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller function to create a user
const signupUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds, adjust as needed

    // Create the user in the database using Sequelize
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Respond with the newly created user
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
};


const getUserProducts = async (req, res) => {
  try {
      const { id} = req.params; // Assuming the user ID is passed as a route parameter

      // Check if user exists
      const user = await User.findByPk(2);
      if (!user) {
     
          return res.status(404).json({ message: 'User not found' });
      }

      // Fetch products associated with the user
      const products = await Product.findAll({
          where: { user_id: id}, // Assuming 'userId' is the foreign key in the Product table
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

      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



const getUserLikes = async (req, res) => {
  try {
    console.log("tite")
    const { id } = req.params;

    // Find the user and include the products they liked, along with categories and product images
    const user = await User.findByPk(id, {
      include: {
        model: Product,
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
        through: { attributes: [] }, // Exclude 'Like' table attributes    
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("tite")
    console.log(user.Products)
    res.json({products : user.Products}); // Return the liked products with categories and images
  } catch (error) {
    console.error("Error fetching liked products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserReviews = async (req, res) => {
  
}

module.exports = { signupUser, loginUser, getUserProducts, getUserLikes };
