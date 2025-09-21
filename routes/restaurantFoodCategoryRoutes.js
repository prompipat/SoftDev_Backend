// restaurantFoodCategoryRoutes.js
import express from "express";
import {
  addFoodCategory,
  fetchFoodCategories,
  fetchFoodCategoryById,
  modifyFoodCategory,
  removeFoodCategory
} from "../controllers/restaurantFoodCategoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the food category
 *         name:
 *           type: string
 *           description: Food category's unique name
 *       example:
 *         name: "อาหารไทย"
 */

/**
 * @swagger
 * /api/food-categories:
 *   post:
 *     summary: Create a new food category
 *     tags: [FoodCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategory'
 *     responses:
 *       201:
 *         description: Food category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategory'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all food categories
 *     tags: [FoodCategories]
 *     responses:
 *       200:
 *         description: List of all food categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodCategory'
 *       500:
 *         description: Server error
 */
router.post("/food-categories", addFoodCategory);
router.get("/food-categories", fetchFoodCategories);

/**
 * @swagger
 * /api/food-categories/{id}:
 *   get:
 *     summary: Get a food category by ID
 *     tags: [FoodCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food category
 *     responses:
 *       200:
 *         description: Food category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategory'
 *       404:
 *         description: Food category not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a food category
 *     tags: [FoodCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodCategory'
 *     responses:
 *       200:
 *         description: Updated food category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodCategory'
 *       404:
 *         description: Food category not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a food category
 *     tags: [FoodCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food category
 *     responses:
 *       200:
 *         description: Food category deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/food-categories/:id", fetchFoodCategoryById);
router.put("/food-categories/:id", modifyFoodCategory);
router.delete("/food-categories/:id", removeFoodCategory);

export default router;
