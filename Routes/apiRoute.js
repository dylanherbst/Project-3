const express = require("express");
const router = express.Router();
const Controllers = require("../Controllers");

router.get('/populate', Controllers.apiController.apiProducts);

module.exports = router;