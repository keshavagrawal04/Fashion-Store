const router = require("express").Router();
const { productController } = require("../controllers");

router.post("/add", productController.addProduct);
router.post("/get", productController.getAllProducts);

module.exports = router;
