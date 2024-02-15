"use strict";
const axios = require('axios');
const Models = require("../Models");

const apiProducts = async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const data = response.data;

        // Assuming data.products contains the array of products
        for (const productData of data.products) {
            // Create a new product in your database
            // Adjust the fields according to your Product model
            await Models.Product.create({
                name: productData.title, // Adjust field names based on your model
                desc: productData.description,
                img: productData.images[0],
                price: productData.price,
                stock: productData.stock
            });
        }

        res.status(200).json({ message: 'Products populated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error populating products' });
    }
};

module.exports = {
    apiProducts
};