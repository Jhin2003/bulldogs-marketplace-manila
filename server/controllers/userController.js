const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fs = require("fs"); // For handling file system operations
const path = require("path"); 

const {User, ROLE} = require("../models/User");
const Product = require("../models/Product")
const Likes = require("../models/Like")
const Review = require("../models/Review")
const ProductImage = require("../models/ProductImage")
const Category = require("../models/Category");

const SECRET_KEY = process.env.JWT_SECRET_key || "your_jwt_secret"; // Store in .env


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
      role: ROLE.USER, 
    });

    // Respond with the newly created user
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
  
    return res.status(500).json({ message: "Error creating user"});
  }
};


const loginUser = async (req, res) => {

  const { email, password} = req.body;

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

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, image_url: user.image_url },
       SECRET_KEY,
      { expiresIn: "1hr" } // Token expires in 7 days
    );


      return res.status(200).json({token})

    
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};



const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request params

    // Find the user by primary key (ID), excluding the password
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude password for security
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send the user data as a response
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const updateUser = async (req, res) => {
 
  try {
    const { id } = req.params; // Get user ID from request params
    const { username, email } = req.body;
    let imageUrl = null;

    // Find the user by primary key
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude password
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle profile image update
  if (req.file) {
  imageUrl = `/images/userImages/${req.file.filename}`;

  // Check if the user's current image exists and is NOT "default.svg"
  if (
    user.image_url && 
    user.image_url !== "/images/userImages/default.svg" && 
    fs.existsSync(path.join(__dirname, "../public", user.image_url))
  ) {
    fs.unlinkSync(path.join(__dirname, "../public", user.image_url));
  }
}
    // Update user fields
    await user.update({
      username: username || user.username,
      email: email || user.email,
      image_url: imageUrl || user.image_url,
    });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, image_url: user.image_url },
      SECRET_KEY,
      { expiresIn: "1hr" } // Token expires in 7 days
    );
    
    res.status(200).json(
      {token}
    );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





const getUserProducts = async (req, res) => {
  try {
      const { id} = req.params; // Assuming the user ID is passed as a route parameter
     
      // Check if user exists
      const user = await User.findByPk(id);
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
    
   
    res.json({products : user.Products}); // Return the liked products with categories and images
  } catch (error) {
    console.error("Error fetching liked products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserReviews = async (req, res) => {
  // Extract the sellerId from the URL parameters
  const { id } = req.params;

  try {
    // Find all reviews where the seller_id matches the provided sellerId
    const reviews = await Review.findAll({
      where: { seller_id: id },
      include: [
        {
          model: Product, // Assuming you have a Product model that relates to the reviews
          attributes: ['id', 'name', 'price'], // Select specific product fields to return
        },
        {
          model: User, // Assuming you have a User model for reviewers
          attributes: ['id', 'username'], // Select specific user fields to return
          as: 'reviewer', // Alias for the relationship (to distinguish between seller and reviewer)
        },
        {
          model: User, // Include seller information (assuming the seller is a user)
          attributes: ['id', 'username'], // Select specific user fields for the seller
          as: 'seller', // Alias for the relationship (to distinguish between reviewer and seller)
        },
      ],
      order: [['created_at', 'DESC']], // Optional: order by newest first
    });

    // If there are no reviews, you might want to send an appropriate response
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this seller.' });
    }

    // Send back the reviews along with associated product, reviewer, and seller details
    res.status(200).json( reviews );
  } catch (error) {
    // If an error occurs, send back an error message with status 500
    console.error('Error fetching seller reviews:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUserById, updateUser, getUserProducts, getUserLikes, getUserReviews };
