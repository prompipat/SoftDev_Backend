// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's account password
 *         name:
 *           type: string
 *           description: Full name of the user
 *         role:
 *           type: string
 *           description: Role of the user (e.g., customer, restaurant, admin)
 *         bio:
 *           type: string
 *           description: Short biography of the user
 *       example:
 *         email: "johndoe@email.com"
 *         password: "qwerty"
 *         name: "John Doe"
 *         role: "customer"
 *         bio: "User bio"
 * 
 *     UserSignin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: "johndoe@email.com"
 *         password: "qwerty"
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   description: Supabase user object
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignin'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized (invalid email or password)
 *       500:
 *         description: Internal server error
 */
router.post("/signin", loginUser);

export default router;
