import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
import {
  addRestaurant,
  fetchRestaurants,
  fetchRestaurantById,
  modifyRestaurant,
  removeRestaurant,
  findRestaurants
} from "../controllers/restaurantController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category_id
 *       properties:
 *         name:
 *           type: string
 *           description: Restaurant's name
 *         description:
 *           type: string
 *           description: Restaurant's description
 *         category_id:
 *           type: string
 *           description: ID of the category the restaurant belongs to
 *       example:
 *         name: Tasty Corner
 *         description: Best street food in town
 *         category_id: "67890"
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant (requires authentication)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
 *       500:
 *         description: Server error
 */
router.post("/restaurants", authMiddleware, addRestaurant); 
router.get("/restaurants", fetchRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Updated restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/restaurants/search:
 *   get:
 *     summary: Search restaurants with pagination
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for name, description, or category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       categories:
 *                         type: object
 *                       restaurants_images:
 *                         type: array
 *                         items:
 *                           type: object
 *                 pagination:
 *                   type: object
 */
router.get("/restaurants/search", findRestaurants);
router.get("/restaurants/:id", fetchRestaurantById);
router.put("/restaurants/:id", authMiddleware, modifyRestaurant); 
router.delete("/restaurants/:id", authMiddleware, removeRestaurant); 

export default router;
