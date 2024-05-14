const router = require("express").Router();
const { productController } = require("../controllers");

router.post("/add", productController.addProduct);
router.get("/get/:id", productController.getProductById);
router.get("/get", productController.getAllProducts);
router.delete("/delete", productController.deleteProduct);

module.exports = router;
