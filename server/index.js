const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
const path = require("path");


const syncDatabase = require('./db/sync'); // Import sync function

const productRoutes = require("./routes/productRoutes"); // Import the router

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(cors());



app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use("/products", productRoutes); // Routes prefixed with '/products'

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Start the server and sync models
