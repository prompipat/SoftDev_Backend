import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
import {
  addRestaurant,
  fetchRestaurants,
  fetchRestaurantById,
  modifyRestaurant,
  removeRestaurant,
  findRestaurants,
  fetchTopRestaurants
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
 *       properties:
 *         id:
 *           type: string
 *           description: Restaurant UUID
 *         name:
 *           type: string
 *           description: Restaurant's name
 *         description:
 *           type: string
 *           description: Restaurant's description
 *         user_id:
 *           type: string
 *           description: Owner user ID
 *         tax_id:
 *           type: string
 *           description: Tax ID
 *         sub_location:
 *           type: string
 *         location:
 *           type: string
 *         main_categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         food_categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         event_categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               rating:
 *                 type: float
 *               review_info:
 *                 type: string
 *         totalReview:
 *           type: integer
 *         avgRating:
 *           type: float
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: Tasty Corner
 *         description: Best street food in town
 *         user_id: "user-uuid-001"
 *         tax_id: "TX123456"
 *         sub_location: "Downtown"
 *         location: "Bangkok"
 *         main_categories: [{ id: "1", name: "Snack Box" }]
 *         food_categories: [{ id: "2", name: "Dessert" }]
 *         event_categories: [{ id: "3", name: "Party Event" }]
 *         reviews: [{ id: "64d3cbca-02c3-44f3-82e0-bcd1c273ab18", rating: 3.5, review_info: "Well" }]
 *         totalReview: 1
 *         avgRating: 3.5
 *     CreateRestaurant:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Restaurant's name
 *         description:
 *           type: string
 *           description: Restaurant's description
 *         tax_id:
 *           type: string
 *           description: Tax ID
 *         sub_location:
 *           type: string
 *         location:
 *           type: string
 *       example:
 *         name: Tasty Corner
 *         description: Best street food in town
 *         tax_id: "TX123456"
 *         sub_location: "Downtown"
 *         location: "Bangkok"
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
 *             $ref: '#/components/schemas/CreateRestaurant'
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
 *     summary: Get all restaurants with populated categories
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
router.post("/restaurants", authMiddleware, addRestaurant);
router.get("/restaurants", fetchRestaurants);

/**
 * @swagger
 * /api/restaurants/top:
 *   get:
 *     summary: Get top restaurants ranked by average rating
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: Number of top restaurants to return
 *     responses:
 *       200:
 *         description: List of top restaurants by rating
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Server error
 */
router.get("/restaurants/top", fetchTopRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID with populated categories
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant UUID
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
 *     summary: Update a restaurant (requires authentication)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRestaurant'
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
 *     summary: Delete a restaurant (requires authentication)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant UUID
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
 *     summary: Search restaurants with filters and pagination
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for name or description
 *       - in: query
 *         name: main_category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by main category
 *       - in: query
 *         name: food_category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by food category
 *       - in: query
 *         name: event_category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by event category
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
 *                     $ref: '#/components/schemas/Restaurant'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 */
router.get("/restaurants/search", findRestaurants);
router.get("/restaurants/:id", fetchRestaurantById);
router.put("/restaurants/:id", authMiddleware, modifyRestaurant);
router.delete("/restaurants/:id", authMiddleware, removeRestaurant);

export default router;
