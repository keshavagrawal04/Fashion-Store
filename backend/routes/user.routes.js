const router = require("express").Router();
const { userController } = require("../controllers");

router.post("/register", userController.registerUser);

module.exports = router;
