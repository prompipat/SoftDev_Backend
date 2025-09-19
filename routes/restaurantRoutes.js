import express from "express";
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
 *         - user_id
 *         - category_id
 *       properties:
 *         name:
 *           type: string
 *           description: Restaurant's name
 *         description:
 *           type: string
 *           description: Restaurant's description
 *         user_id:
 *           type: string
 *           description: ID of the user who owns the restaurant
 *         category_id:
 *           type: string
 *           description: ID of the category the restaurant belongs to
 *       example:
 *         name: Tasty Corner
 *         description: Best street food in town
 *         user_id: "12345"
 *         category_id: "67890"
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Server error
 */
router.post("/restaurants", addRestaurant);
router.get("/restaurants", fetchRestaurants);

/**
 * @swagger
 * /api/restaurants/search:
 *   get:
 *     summary: Search for restaurants by name, description, or category name
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term to look for in restaurant name, description, or category name
 *     responses:
 *       200:
 *         description: List of matching restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Missing search query
 *       500:
 *         description: Server error
 */
router.get("/restaurants/search", findRestaurants);
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
router.get("/restaurants/:id", fetchRestaurantById);
router.put("/restaurants/:id", modifyRestaurant);
router.delete("/restaurants/:id", removeRestaurant);

export default router;
