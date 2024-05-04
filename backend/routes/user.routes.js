const router = require("express").Router();
const { userController } = require("../controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         number:
 *           type: integer
 *           description: The phone number of the user.
 *         password:
 *           type: object
 *           properties:
 *             hash:
 *               type: string
 *               description: The hashed password of the user.
 *             salt:
 *               type: string
 *               description: The salt used for password hashing.
 *         profileImage:
 *           type: string
 *           description: The URL of the user's profile image.
 *         role:
 *           type: string
 *           enum:
 *             - User
 *             - Admin
 *           default: User
 *           description: The role of the user (either "User" or "Admin").
 */

/**
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - number
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         number:
 *           type: integer
 *           description: The phone number of the user.
 *
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '500':
 *         description: Internal server error
 */

router.post("/user/register", userController.registerUser);

module.exports = router;
