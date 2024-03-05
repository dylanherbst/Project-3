const express = require("express");
const router = express.Router();
const Controllers = require("../Controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // The directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Naming the file
  },
});

const upload = multer({ storage: storage });
// matches GET requests sent to /api/users
// (the prefix from server.js)

// router.get('/', (req, res) => {
// Controllers.productController.getProduct(res);
// })
router.get("/", (req, res) => {
  Controllers.productController.getProduct(req, res);
});

// matches POST requests sent to /api/users/create
// router.post("/create", (req, res) => {
//   Controllers.productController.createProduct(req.body, res);
// });

// router.post("/", (req, res) => {
//   Controllers.productController.createProduct(req.body, res);
// });

router.post("/", upload.single("img"), (req, res) => {
  Controllers.productController.createProduct(req, res);
});

// matches PUT requests to /api/users/123 (stores 123 in id param)
router.put("/:id", (req, res) => {
  Controllers.productController.updateProduct(req, res);
});

// matches DELETE requests to /api/users/123 (123 in id param)
router.delete("/:id", (req, res) => {
  Controllers.productController.deleteProduct(req, res);
});

module.exports = router;
