const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const Product = require("./Product"); // Import Product model if needed

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "categories", // The table name in the database
  timestamps: true,        // Enable timestamps (createdAt and updatedAt)
  underscored: true,       // Automatically convert createdAt to created_at and updatedAt to updated_at
});

module.exports = Category;