const { DataTypes } = require('sequelize');
const sequelize = require("../db/dbConnection");
const User = require('./User'); // Import User model

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: "messages",
  timestamps: false, // Disable automatic timestamp fields
});

module.exports = Message;