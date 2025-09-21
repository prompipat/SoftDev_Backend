// restaurantMainCategoryMapRoutes.js
import express from "express";
import {
  addRestaurantMainCategoryMap,
  fetchRestaurantMainCategoryMaps,
  fetchRestaurantMainCategoryMapById,
  modifyRestaurantMainCategoryMap,
  removeRestaurantMainCategoryMap,
} from "../controllers/restaurantMainCategoryMapController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantMainCategoryMap:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - main_category_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the mapping
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant
 *         main_category_id:
 *           type: string
 *           description: ID of the main category
 *       example:
 *         id: "1"
 *         restaurant_id: "10"
 *         main_category_id: "5"
 */

/**
 * @swagger
 * /api/restaurant-main-category-maps:
 *   post:
 *     summary: Create a new restaurant-main-category mapping
 *     tags: [RestaurantMainCategoryMaps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantMainCategoryMap'
 *     responses:
 *       201:
 *         description: Mapping created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantMainCategoryMap'
 *       400:
 *         description: Invalid input or duplicate mapping
 *   get:
 *     summary: Get all restaurant-main-category mappings
 *     tags: [RestaurantMainCategoryMaps]
 *     responses:
 *       200:
 *         description: List of mappings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RestaurantMainCategoryMap'
 *       500:
 *         description: Server error
 */
router.post("/restaurant-main-category-maps", addRestaurantMainCategoryMap);
router.get("/restaurant-main-category-maps", fetchRestaurantMainCategoryMaps);

/**
 * @swagger
 * /api/restaurant-main-category-maps/{id}:
 *   get:
 *     summary: Get a mapping by ID
 *     tags: [RestaurantMainCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     responses:
 *       200:
 *         description: Mapping details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantMainCategoryMap'
 *       404:
 *         description: Mapping not found
 *   put:
 *     summary: Update a mapping
 *     tags: [RestaurantMainCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantMainCategoryMap'
 *     responses:
 *       200:
 *         description: Updated mapping
 *       404:
 *         description: Mapping not found
 *       400:
 *         description: Invalid update
 *   delete:
 *     summary: Delete a mapping
 *     tags: [RestaurantMainCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     responses:
 *       200:
 *         description: Mapping deleted successfully
 *       404:
 *         description: Mapping not found
 */
router.get("/restaurant-main-category-maps/:id", fetchRestaurantMainCategoryMapById);
router.put("/restaurant-main-category-maps/:id", modifyRestaurantMainCategoryMap);
router.delete("/restaurant-main-category-maps/:id", removeRestaurantMainCategoryMap);

export default router;
