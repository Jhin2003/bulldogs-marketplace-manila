const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection"); // Import database configuration
const  {User}  = require("./User"); // Import User model
const Product = require("./Product"); // Import Product model

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "transactions", // Optional: Custom table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true,
  }
);

module.exports = Transaction;