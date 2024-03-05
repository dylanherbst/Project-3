const express = require("express");
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Private Image Uploads
// app.use(express.static("uploads")); // API fetched Products w/ Images
require("dotenv").config();
let dbConnect = require("./dbConnect");

let customerRoutes = require("./Routes/customerRoute");
let orderRoutes = require("./Routes/orderRoute");
let prodcutRoutes = require("./Routes/productRoute");

// parse requests of content-type - application/json
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to mySQL application." });
});

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", prodcutRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
