// Import all models
const {User} = require("./User");
const UserImage = require("./UserImage");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Category = require("./Category");
const Message = require("./Message");
const Review = require("./Review");
const Like = require("./Like")
const Transaction = require("./Transaction")

// Define model associations
 //Users and Messages
User.hasMany(Message, {  foreignKey: "senderId" });
User.hasMany(Message, {  foreignKey: "receiverId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

// Users and Products
User.hasMany(Product, { foreignKey: "user_id" });
Product.belongsTo(User, { foreignKey: "user_id" });

// Products and Categories
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

// Users and User Images
User.hasMany(UserImage, { foreignKey: "user_id" });
UserImage.belongsTo(User, { foreignKey: "user_id" });

// Products and Product Images
Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

User.belongsToMany(Product, { through: Like, foreignKey: "user_id" });
Product.belongsToMany(User, { through: Like, foreignKey: "product_id" });


User.hasMany(Review, { as: "seller", foreignKey: "seller_id" }); // Seller receives reviews
Review.belongsTo(User, { as: "seller", foreignKey: "seller_id" }); // A review belongs to a seller

User.hasMany(Review, { as: "reviewer", foreignKey: "reviewer_id" }); // Reviewer writes reviews
Review.belongsTo(User, { as: "reviewer" ,foreignKey: "reviewer_id" }); // A review belongs to a reviewer

Product.hasMany(Review, { foreignKey: "product_id" }); // A product can have multiple reviews
Review.belongsTo(Product, { foreignKey: "product_id" }); // A review is linked to one product

Transaction.belongsTo(User, { foreignKey: "seller_id", as: "Seller", onDelete : "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "buyer_id", as: "Buyer", onDelete : "CASCADE" });
Transaction.belongsTo(Product, { foreignKey: "product_id" , onDelete : "CASCADE"});
Product.hasMany(Transaction, { foreignKey: "product_id" });


// Export models and associations
module.exports = {
  User,
  UserImage,
  Product,
  ProductImage,
  Category,
  Message,
  Like,
  Review,
  Transaction
};
