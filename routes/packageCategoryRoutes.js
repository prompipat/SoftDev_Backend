import {
  addPackageCategory,
  fetchPackageCategories,
  fetchPackageCategoryById,
  modifyPackageCategory,
  removePackageCategory,
  fetchPackageCategoriesByRestaurant
} from "../controllers/packageCategoryController.js";
import express from "express";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     PackageCategory:
 *       type: object
 *       required:
 *         - name
 *         - restaurant_id
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the package category
 *         restaurant_id:
 *           type: uuid
 *           description: The ID of the restaurant this category belongs to
 *       example:
 *         name: Buffet
 *         restaurant_id: 123e4567-e89b-12d3-a456-426614174000
 */

/**
 * @swagger
 * tags:
 *   name: PackageCategories
 *   description: The package categories managing API
 */

/**
 * @swagger
 * /api/package-categories:
 *   post:
 *     summary: Create a new package category
 *     tags: [PackageCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageCategory'
 *     responses:
 *       201:
 *         description: The package category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageCategory'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Some server error
 *
 *   get:
 *     summary: Returns the list of all the package categories
 *     tags: [PackageCategories]
 *     responses:
 *       200:
 *         description: The list of the package categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageCategory'
 *       500:
 *         description: Some server error
 *
 * /api/package-categories/{id}:
 *   get:
 *     summary: Get the package category by id
 *     tags: [PackageCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package category id
 *     responses:
 *       200:
 *         description: The package category description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageCategory'
 *       404:
 *         description: The package category was not found
 *       500:
 *         description: Some server error
 *
 *   put:
 *     summary: Update a package category
 *     tags: [PackageCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageCategory'
 *     responses:
 *       200:
 *         description: The package category was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageCategory'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: The package category was not found
 *       500:
 *         description: Some server error
 *
 *   delete:
 *     summary: Remove the package category by id
 *     tags: [PackageCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package category id
 *     responses:
 *       200:
 *         description: The package category was deleted
 *       404:
 *         description: The package category was not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/package-categories/restaurant/{restaurant_id}:
 *   get:
 *     summary: Get all package categories for a specific restaurant, including their packages
 *     tags: [PackageCategories]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: List of categories with their packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   packages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         discount:
 *                           type: number
 *                         start_discount_date:
 *                           type: string
 *                           format: date
 *                         end_discount_date:
 *                           type: string
 *                           format: date
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */

router.post("/package-categories", addPackageCategory);
router.get("/package-categories", fetchPackageCategories);
router.get("/package-categories/:id", fetchPackageCategoryById);
router.put("/package-categories/:id", modifyPackageCategory);
router.delete("/package-categories/:id", removePackageCategory);

router.get("/package-categories/restaurant/:restaurant_id", fetchPackageCategoriesByRestaurant);

export default router;
