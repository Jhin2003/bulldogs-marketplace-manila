const { Sequelize } = require('sequelize');

// Set up the Sequelize instance
const sequelize = new Sequelize('bulldogs_marketplace_manila', 'root', '2003', {
  host: 'localhost',    // or any database host you're using
  dialect: 'mysql',     // or 'postgres', 'sqlite', etc.
  logging: false,       // Set to `true` if you want to see SQL queries in the console
});

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