const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection"); // Import database connection
const User = require("./User"); // Import User model
const Category = require("./Category");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Table name of the User model
        key: "id", // Column in the User table
      },
      onDelete: "CASCADE", // Deletes product if associated user is deleted
      onUpdate: "CASCADE", // Updates user_id if associated user's id changes
    },

    category_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category, // Table name of the User model
        key: "id", // Column in the User table
      },
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product", // Optional: Custom table name
    timestamps: false, // Disable automatic `createdAt` and `updatedAt`
  }
);



module.exports = Product;
