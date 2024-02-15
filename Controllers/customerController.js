"use strict";

const Models = require("../Models");
// finds all users in DB, then sends array as response

const getCustomer = (res) => {
Models.Customer.findAll({}).then(data => {
res.send({result: 200 , data: data});
}).catch(err => {
console.log(err);
res.send({ result: 500, error: err.message });
})
}

// uses JSON from request body to create new user in DB
const createCustomer = (req, res) => {
    Models.Customer.create(req).then(data => {
    res.send({ result: 200 , data: data});
    }).catch(err => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    })
    }
    
// uses JSON from request body to update user ID from params
const updateCustomer = (req, res) => {
    Models.Customer.update(req.body, { where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };
    // deletes user matching ID from params
    const deleteCustomer = (req, res) => {
    Models.Customer.destroy({ where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };

module.exports = {
getCustomer, createCustomer,updateCustomer, deleteCustomer
}