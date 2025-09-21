// restaurantFoodCategoryMapRoutes.js
import express from "express";
import {
  addRestaurantFoodCategoryMap,
  fetchRestaurantFoodCategoryMaps,
  fetchRestaurantFoodCategoryMapById,
  modifyRestaurantFoodCategoryMap,
  removeRestaurantFoodCategoryMap,
} from "../controllers/restaurantFoodCategoryMapController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantFoodCategoryMap:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - food_category_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the mapping
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant
 *         food_category_id:
 *           type: string
 *           description: ID of the food category
 *       example:
 *         id: "1"
 *         restaurant_id: "10"
 *         food_category_id: "5"
 */

/**
 * @swagger
 * /api/restaurant-food-category-maps:
 *   post:
 *     summary: Create a new restaurant-food-category mapping
 *     tags: [RestaurantFoodCategoryMaps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantFoodCategoryMap'
 *     responses:
 *       201:
 *         description: Mapping created successfully
 *       400:
 *         description: Invalid input or duplicate mapping
 *   get:
 *     summary: Get all restaurant-food-category mappings
 *     tags: [RestaurantFoodCategoryMaps]
 *     responses:
 *       200:
 *         description: List of mappings
 */
router.post("/restaurant-food-category-maps", addRestaurantFoodCategoryMap);
router.get("/restaurant-food-category-maps", fetchRestaurantFoodCategoryMaps);

/**
 * @swagger
 * /api/restaurant-food-category-maps/{id}:
 *   get:
 *     summary: Get a mapping by ID
 *     tags: [RestaurantFoodCategoryMaps]
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
 *       404:
 *         description: Mapping not found
 *   put:
 *     summary: Update a mapping
 *     tags: [RestaurantFoodCategoryMaps]
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
 *             $ref: '#/components/schemas/RestaurantFoodCategoryMap'
 *     responses:
 *       200:
 *         description: Updated mapping
 *       404:
 *         description: Mapping not found
 *       400:
 *         description: Invalid update
 *   delete:
 *     summary: Delete a mapping
 *     tags: [RestaurantFoodCategoryMaps]
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
router.get("/restaurant-food-category-maps/:id", fetchRestaurantFoodCategoryMapById);
router.put("/restaurant-food-category-maps/:id", modifyRestaurantFoodCategoryMap);
router.delete("/restaurant-food-category-maps/:id", removeRestaurantFoodCategoryMap);

export default router;
