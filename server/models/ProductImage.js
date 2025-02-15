const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection'); 
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,   // Referencing the Product model
      key: 'id',        // Referring to the 'id' column in the Product model
    },
    onDelete: 'CASCADE', // Ensures images are deleted when the associated product is deleted
  },
  image_url: {
    type: DataTypes.STRING(255),   // URL or path to the image
    allowNull: false,
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,    // Default is false, indicating the image is not the primary one
  },

}, {
  tableName: 'product_image',   // Define custom table name
  timestamps: true,        // Enable timestamps (createdAt and updatedAt)
  underscored: true, 
  
});


module.exports = ProductImage;