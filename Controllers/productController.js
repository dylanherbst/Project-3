"use strict";

const Models = require("../Models");
// finds all users in DB, then sends array as response

const getProduct = (res) => {
Models.Product.findAll({}).then(data => {
res.send({result: 200 , data: data});
}).catch(err => {
console.log(err);
res.send({ result: 500, error: err.message });
})
}

// uses JSON from request body to create new user in DB
const createProduct = (req, res) => {
    Models.Product.create(req).then(data => {
    res.send({ result: 200 , data: data});
    }).catch(err => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    })
    }
    
// uses JSON from request body to update user ID from params
const updateProduct = (req, res) => {
    Models.Product.update(req.body, { where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };
    // deletes user matching ID from params
    const deleteProduct = (req, res) => {
    Models.Product.destroy({ where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };

module.exports = {
getProduct, createProduct,updateProduct, deleteProduct
}