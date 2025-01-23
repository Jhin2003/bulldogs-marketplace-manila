const express = require("express");
const app = express();
var cors = require("cors");

const path = require("path");
const multer = require("multer");
require('dotenv').config();


const port = process.env.PORT || 3000;

const {syncDatabase} = require('./db/sync'); // Import sync function
const Routes = require('./routes/routes.js'); // Import routes

//middlewares
app.use(express.json());
app.use(cors());

//serve public images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//Routers
app.use('/', Routes);


syncDatabase().then(() => {
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// Start the server and sync models
