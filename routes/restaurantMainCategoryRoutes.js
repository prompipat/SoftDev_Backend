// restaurantMainCategoryRoutes.js
import express from "express";
import {
  addMainCategory,
  fetchMainCategories,
  fetchMainCategoryById,
  modifyMainCategory,
  removeMainCategory
} from "../controllers/restaurantMainCategoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MainCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the main category
 *         name:
 *           type: string
 *           description: Main category's unique name
 *       example:
 *         name: "Main Dishes"
 */

/**
 * @swagger
 * /api/main-categories:
 *   post:
 *     summary: Create a new main category
 *     tags: [MainCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MainCategory'
 *     responses:
 *       201:
 *         description: Main category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MainCategory'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all main categories
 *     tags: [MainCategories]
 *     responses:
 *       200:
 *         description: List of all main categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MainCategory'
 *       500:
 *         description: Server error
 */
router.post("/main-categories", addMainCategory);
router.get("/main-categories", fetchMainCategories);

/**
 * @swagger
 * /api/main-categories/{id}:
 *   get:
 *     summary: Get a main category by ID
 *     tags: [MainCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the main category
 *     responses:
 *       200:
 *         description: Main category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MainCategory'
 *       404:
 *         description: Main category not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a main category
 *     tags: [MainCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the main category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MainCategory'
 *     responses:
 *       200:
 *         description: Updated main category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MainCategory'
 *       404:
 *         description: Main category not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a main category
 *     tags: [MainCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the main category
 *     responses:
 *       200:
 *         description: Main category deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/main-categories/:id", fetchMainCategoryById);
router.put("/main-categories/:id", modifyMainCategory);
router.delete("/main-categories/:id", removeMainCategory);

export default router;
