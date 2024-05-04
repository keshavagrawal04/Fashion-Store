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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 */

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
router.post("/register", userController.registerUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *     UserLoginResponse:
 *       x-internal: true
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier for the user.
 *         role:
 *           type: string
 *           enum:
 *             - User
 *             - Admin
 *           description: The role of the user (either "User" or "Admin").
 *         tokens:
 *           type: object
 *           properties:
 *             access:
 *               type: string
 *               description: Access token for authentication.
 *             refresh:
 *               type: string
 *               description: Refresh token for refreshing access tokens.
 *
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       '401':
 *         description: Unauthorized. Invalid email or password.
 *       '500':
 *         description: Internal server error
 */
router.post("/login", userController.loginUser);

module.exports = router;
