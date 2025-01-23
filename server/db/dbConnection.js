const { Sequelize } = require('sequelize');
require('dotenv').config(); // Make sure to load the environment variables

// Set up the Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name from the .env file
  process.env.DB_USER,        // Database username from the .env file
  process.env.DB_PASSWORD,    // Database password from the .env file
  {
    host: process.env.DB_HOST,        // Database host from the .env file
    dialect: process.env.DB_DIALECT,  // Database dialect from the .env file
    logging: false,                   // Set to `true` if you want to see SQL queries in the console
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;