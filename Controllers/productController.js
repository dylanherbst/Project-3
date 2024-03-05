"use strict";

const Models = require("../Models");
const axios = require("axios");

// finds all users in DB, then sends array as response

const getProduct = async (req, res) => {
  try {
    // Fetch products from the external API
    const response = await axios.get("https://dummyjson.com/products");
    const data = response.data;

    // Populate the database with the fetched products
    for (const productData of data.products) {
      await Models.Product.findOrCreate({
        where: { name: productData.title },
        defaults: {
          desc: productData.description,
          img: productData.images[0],
          price: productData.price,
          stock: productData.stock,
        },
      });
    }
    const products = await Models.Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Send the fetched products in the response
    res.status(200).json({ result: 200, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

const createProduct = (req, res) => {
  const productData = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    stock: req.body.stock,
    img: req.file ? req.file.path : null, // Use the file path if an image was uploaded
  };

  console.log("Product data:", productData);
  console.log("File:", req.file);
  Models.Product.create(productData)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to update user ID from params
const updateProduct = (req, res) => {
  Models.Product.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
// deletes user matching ID from params
const deleteProduct = (req, res) => {
  Models.Product.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
