const router = require("express").Router();
const { userController } = require("../controllers");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOtp);
router.post("/create-password", userController.createPassword);

module.exports = router;
