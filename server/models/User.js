const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection"); // Import database configuration



const ROLE = {
  ADMIN: "admin",
  USER: "user",
};

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates email format
      },
    },

    image_url: {
      type: DataTypes.STRING(255), // URL or path to the image
      defaultValue: "/images/default/Default.jpg",
    },

    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ROLE.USER, // Default role is "user"
      validate: {
        isIn: [Object.values(ROLE)], // Only allow predefined roles
      },
    },
  },
  {
    tableName: "user", // Optional: Custom table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true,
  }
);

module.exports = {User, ROLE};
