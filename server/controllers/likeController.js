const  Like  = require("../models/Like");


const getLikeStatus = async (req, res) => {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }
  
    try {
      const like = await Like.findOne({
        where: {
          user_id: userId,
          product_id: productId
        }
      });
  
      if (like) {
        return res.status(200).json({ liked: true });
      } else {
        return res.status(200).json({ liked: false });
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Like a product
const likeProduct = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this product" });
    }

    // Create a new like
    const newLike = await Like.create({
      user_id : userId,
      product_id : productId,
    });

    res.status(201).json(newLike);
  } catch (error) {
    console.error("Error liking product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const unlikeProduct = async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }
  
    try {
      // Attempt to delete the like from the database
      const result = await Like.destroy({
        where: {
          user_id: userId,
          product_id: productId,
        },
      });
  
      if (result === 0) {
        // No like found to delete
        return res.status(404).json({ message: "Like not found" });
      }
  
      // Success response
      return res.status(200).json({
        message: "Successfully unliked the product!",
        userId,
        productId,
      });
    } catch (error) {
      console.error("Error unliking product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports = {getLikeStatus, likeProduct,unlikeProduct}
