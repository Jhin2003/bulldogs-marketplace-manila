const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const Product = require("./Product"); // Import User model

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
 
},{
    tableName: "categories",
    timestamps: false, // Disable automatic
}

);

module.exports = Category;
