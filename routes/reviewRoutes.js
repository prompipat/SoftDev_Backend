import express from "express";
import {
    addReview,
    fetchReviews,
    fetchReviewById,
    modifyReview,
    removeReview
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - review_info
 *         - restaurant_id
 *         - user_id
 *         - rating
 *       properties:
 *         review_info:
 *           type: string
 *           description: Details of the review
 *         restaurant_id:
 *           type: foreign key
 *           description: ID of the restaurant being reviewed
 *         user_id:
 *           type: foreign key
 *           description: ID of the user who wrote the review
 *         rating:
 *           type: float
 *           description: Rating given by the user
 *       example:
 *         review_info: "Great food and excellent service!"
 *         restaurant_id: "26eb148f-d644-4560-a87c-b5fe9db64a72"
 *         user_id: "21e7012f-2939-4fba-b295-9208e324dd3b"
 *         rating: 5
 */


/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all reviews
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

router.post("/reviews", addReview);
router.get("/reviews", fetchReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
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
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Updated review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a review
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
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

router.get("/reviews/:id", fetchReviewById);
router.put("/reviews/:id", modifyReview);
router.delete("/reviews/:id", removeReview);

export default router;