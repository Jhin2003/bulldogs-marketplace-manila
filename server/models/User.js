const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');  // Import database configuration

const User = sequelize.define('User', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user', // Optional: Custom table name
  timestamps: true,  // Adds createdAt and updatedAt fields automatically
});



module.exports = User;

