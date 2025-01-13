const Product = require('./Product');
const ProductImage = require('./ProductImage');
const User = require('./User');

User.hasMany(Product, { foreignKey: 'user_id' })
Product.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { Product, ProductImage, User };