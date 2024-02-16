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
    const { customerId, products } = req.body;

    try {
        let totalPrice = 0;

        // Calculate total price based on product prices and quantities
        for (const item of products) {
            const product = await Models.Product.findByPk(item.productId);
            if (!product || product.stock < item.quantity) {
                throw new Error(`Product ${item.productId} not found or not enough stock`);
            }
            totalPrice += product.price * item.quantity;
        }

        // Create the order with the initial total price
        const order = await Models.Order.create({
            customerId,
            orderDate: new Date(),
            status: 'pending',
            totalPrice: totalPrice
        });

        // Create order details and update product stock
        for (const item of products) {
            const product = await Models.Product.findByPk(item.productId);
            product.stock -= item.quantity;
            await product.save();
            await Models.OrderDetail.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity
            });
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
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