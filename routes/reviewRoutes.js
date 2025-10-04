import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
import {
  addReview,
  fetchReviews,
  fetchReviewById,
  modifyReview,
  removeReview,
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         role:
 *           type: string
 *           description: Role of the user
 *         profile_picture:
 *           type: string
 *           description: Profile picture URL of the user
 *       example:
 *         id: "c0a8011e-8c74-4e41-9856-ffa045de9b7c"
 *         name: "Somchai Saelim"
 *         email: "somchai@example.com"
 *         role: "customer"
 *         profile_picture: "https://example.com/avatar.jpg"
 *
 *     Review:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - review_info
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the review
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant being reviewed
 *         review_info:
 *           type: string
 *           description: The content of the review
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 1
 *           maximum: 5
 *           description: Rating score from 1 to 5
 *         timestamp:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Automatically generated timestamp (Thailand local time)
 *         user:
 *           $ref: '#/components/schemas/User'
 *           readOnly: true
 *           description: Populated user who created the review
 *       example:
 *         id: "f38c8a00-5f84-4453-8e3c-1d4a6ce4d5ba"
 *         restaurant_id: "6bde7b33-0f02-4bc0-b1e0-12441ac9331d"
 *         review_info: "อาหารอร่อย บริการดีมาก!"
 *         rating: 4.8
 *         timestamp: "2025-10-04T18:45:00+07:00"
 *         user:
 *           id: "c0a8011e-8c74-4e41-9856-ffa045de9b7c"
 *           name: "Somchai Saelim"
 *           email: "somchai@example.com"
 *           role: "customer"
 *           profile_picture: "https://example.com/avatar.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing restaurant reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review (timestamp and user auto-generated)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurant_id
 *               - review_info
 *               - rating
 *             properties:
 *               restaurant_id:
 *                 type: string
 *                 description: ID of the restaurant being reviewed
 *               review_info:
 *                 type: string
 *                 description: The content of the review
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating from 1 to 5
 *             example:
 *               restaurant_id: "6bde7b33-0f02-4bc0-b1e0-12441ac9331d"
 *               review_info: "อาหารอร่อยและบรรยากาศดีมาก!"
 *               rating: 5
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all reviews (populates user)
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 */
router.post("/reviews", authMiddleware, addReview);
router.get("/reviews", fetchReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID (populated with user)
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_info:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Review not found
 *
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.get("/reviews/:id", fetchReviewById);
router.put("/reviews/:id", authMiddleware, modifyReview);
router.delete("/reviews/:id", authMiddleware, removeReview);

export default router;
