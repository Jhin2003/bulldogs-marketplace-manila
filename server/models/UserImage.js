const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const User = require("./User")


const UserImage = sequelize.define(
  "UserImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Name of the associated User model
        key: "id",
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "user_image", // Optional: Custom table name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  });

module.exports = UserImage;
