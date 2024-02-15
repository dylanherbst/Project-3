const express = require("express");
const router = express.Router();
const Controllers = require("../Controllers");
// matches GET requests sent to /api/users
// (the prefix from server.js)

router.get('/', (req, res) => {
Controllers.orderController.getOrder(res);
})
// matches POST requests sent to /api/users/create
// router.post('/create', (req, res) => {
// Controllers.orderController.createOrder(req.body, res)
// })
router.post('/create', (req, res) => {
    Controllers.orderController.createOrder(req, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
router.put('/:id', (req, res) => {
Controllers.orderController.updateOrder(req, res)
})

// matches DELETE requests to /api/users/123 (123 in id param)
router.delete('/:id', (req, res) => {
Controllers.orderController.deleteOrder(req, res)
})


module.exports = router;