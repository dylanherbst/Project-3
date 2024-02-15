"use strict";

const Models = require("../Models");

// finds all users in DB, then sends array as response

const getOrder = (res) => {
Models.Order.findAll({}).then(data => {
res.send({result: 200 , data: data});
}).catch(err => {
console.log(err);
res.send({ result: 500, error: err.message });
})
}

// uses JSON from request body to create new user in DB
// const createOrder = (req, res) => {
//     Models.Order.create(req).then(data => {
//     res.send({ result: 200 , data: data});
//     }).catch(err => {
//     console.log(err);
//     res.send({ result: 500, error: err.message });
//     })
//     }

const createOrder = async (req, res) => {
    const { productId, customerId, quantity } = req.body;

    try {
        // Find the product being ordered
        const product = await Models.Product.findByPk(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if there is enough stock available
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        const totalPrice = product.price * quantity;

        // Reduce the product stock and save the updated product
        product.stock -= quantity;
        await product.save();

        // Create the order
        const order = await Models.Order.create({
            customerId,
            orderDate: new Date(),
            status: 'pending',
            totalPrice: totalPrice
        });

        // Create the order detail
        const orderDetail = await Models.OrderDetail.create({
            orderId: order.id,
            productId,
            quantity
        });

        // Return the created order and order detail
        res.status(201).json({ order, orderDetail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

    
// uses JSON from request body to update user ID from params
const updateOrder = (req, res) => {
    Models.Order.update(req.body, { where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };
    // deletes user matching ID from params
    const deleteOrder = (req, res) => {
    Models.Order.destroy({ where: { id: req.params.id } })
    .then(data => {
    res.send({ result: 200, data: data });
    }).catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
    });
    };

module.exports = {
getOrder, createOrder,updateOrder, deleteOrder
}