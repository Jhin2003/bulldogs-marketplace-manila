const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const User = require("./User");

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
      defaultValue: "/default/default.jpg",
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_image", // Optional: Custom table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true,
  }
);

module.exports = UserImage;
