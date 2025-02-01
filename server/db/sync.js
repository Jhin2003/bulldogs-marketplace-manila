const  sequelize  = require('./dbConnection');
const { Product, ProductImage, User, UserImage , Category, Like} = require('../models/associations'); // Import models

const syncDatabase = async () => {
  try {
    console.log("Starting the sync process...");

    // Synchronize all models with the database
    await sequelize.sync({ force: false });  // Use force: true to drop and recreate tables, false to avoid that

    console.log("All models have been synchronized with the database.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};


module.exports = {syncDatabase}

