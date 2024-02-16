'use strict';
const Customer = require('./customer'); // Require the model
const Product = require('./product'); // Require the model
const Order = require('./order'); // Require the model
const OrderDetail = require('./orderDetails'); // Require the model

// Define associations
// Order and Customer associations
Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderDetail, { foreignKey: 'productId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });


async function init() {
    try {
        await Customer.sync();
        await Product.sync();
        await Order.sync();
        await OrderDetail.sync();
        console.log('Models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

init();

module.exports = {
   Customer, Product, Order, OrderDetail
    };