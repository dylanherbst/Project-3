const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
let dbConnect = require("./dbConnect");

let customerRoutes = require('./Routes/customerRoute');
let orderRoutes = require('./Routes/orderRoute');
let prodcutRoutes = require('./Routes/productRoute');
let apiRoutes = require('./Routes/apiRoute');





// parse requests of content-type - application/json

app.get("/", (req, res) => {
res.json({ message: "Welcome to mySQL application." });
});



app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', prodcutRoutes);
app.use('/api/apiproducts', apiRoutes);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});