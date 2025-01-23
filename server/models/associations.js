const Product = require("./Product");
const ProductImage = require("./ProductImage");
const UserImage = require("./UserImage");
const User = require("./User");
const Message = require("./Message");
const Category = require("./Category");

Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Message, { foreignKey: "receiverId" });

User.hasMany(Product, { foreignKey: "user_id" });
Product.belongsTo(User, { foreignKey: "user_id" });

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

User.hasMany(UserImage, { foreignKey: "user_id" });
UserImage.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

module.exports = { Product, ProductImage, User, Message, UserImage, Category };
