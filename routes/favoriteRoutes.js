import express from "express";
import {
  addFavorite,
  fetchFavorites,
  fetchFavoriteById,
  modifyFavorite,
  removeFavorite,
  fetchMyFavorites
} from "../controllers/favoriteController.js";
import { authMiddleware } from "../services/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - restaurant_id
 *       properties:
 *         id:
 *           type: string
 *           description: Favorite ID
 *         user_id:
 *           type: string
 *           description: ID of the user who favorited
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant that is favorited
 *         restaurants:
 *           type: object
 *           description: (Optional) joined restaurant details
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             categories:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *             restaurants_images:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   url:
 *                     type: string
 *                   filename:
 *                     type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the favorite was created
 *       example:
 *         id: "b1a2c3d4-5e6f-7a8b-9c0d-111213141516"
 *         user_id: "21e7012f-2939-4fba-b295-9208e324dd3b"
 *         restaurant_id: "26eb148f-d644-4560-a87c-b5fe9db64a72"
 *         created_at: "2025-09-19T07:30:00Z"
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Create a new favorite (requires authentication)
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     description: The server will set `user_id` from the authenticated user. Only `restaurant_id` is required in the body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurant_id
 *             properties:
 *               restaurant_id:
 *                 type: string
 *                 description: ID of the restaurant to favorite
 *             example:
 *               restaurant_id: "26eb148f-d644-4560-a87c-b5fe9db64a72"
 *     responses:
 *       201:
 *         description: Favorite created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all favorites
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of all favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       500:
 *         description: Server error
 */
router.post("/favorites", authMiddleware, addFavorite);
router.get("/favorites", fetchFavorites);

/**
 * @swagger
 * /api/favorites/me:
 *   get:
 *     summary: Get all favorites for the authenticated user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/favorites/me", authMiddleware, fetchMyFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favorite
 *     responses:
 *       200:
 *         description: Favorite details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a favorite by ID (requires authentication)
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favorite to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a favorite by ID (requires authentication)
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favorite to delete
 *     responses:
 *       200:
 *         description: Favorite deleted successfully
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Server error
 */
router.get("/favorites/:id", fetchFavoriteById);
router.put("/favorites/:id", authMiddleware, modifyFavorite);
router.delete("/favorites/:id", authMiddleware, removeFavorite);

export default router;
