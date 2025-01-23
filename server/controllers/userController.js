const bcrypt = require("bcryptjs");
const User = require("../models/User");


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

module.exports = { signupUser, loginUser };
