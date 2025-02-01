const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection"); // Adjust the path as necessary
const Product = require("./Product");
const User = require("./User");

const Like = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: User, // Reference the User model
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product, // Reference the Product model
        key: "id",
      },
    },
  },
  {
    tableName: "likes", // Name of the table
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true,
  }
);

module.exports = Like;
