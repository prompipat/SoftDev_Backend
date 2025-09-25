import express from "express";

import {
  addPackage,
  fetchPackages,
  fetchPackageById,
  modifyPackage,
  removePackage,
  fetchPackagesByCategory,
  fetchTopPromotions,
} from "../controllers/packageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PackageDetailDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the package detail
 *         description:
 *           type: string
 *           description: Description of the package detail
 *         old_price:
 *           type: number
 *           format: float
 *           description: Original price before discount
 *         price:
 *           type: number
 *           format: float
 *           description: Current price (after discount if applicable)
 *         has_discount:
 *           type: boolean
 *           description: Whether the item has a discount applied
 *
 *     PackageDetailResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/PackageDetailDto'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Auto-generated ID of the package detail
 *
 *     PackageCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the package category
 *
 *     PackageCategoryResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/PackageCategoryDto'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID of the package category
 *
 *     CreatePackageDto:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - name
 *         - description
 *         - category_id
 *       properties:
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant this package belongs to
 *         name:
 *           type: string
 *           description: Name of the package
 *         description:
 *           type: string
 *           description: Detailed description of the package
 *         category_id:
 *           type: string
 *           description: ID of the package category
 *         discount:
 *           type: number
 *           format: float
 *           description: Discount on the package (percentage)
 *         start_discount_date:
 *           type: string
 *           format: date
 *           description: Start date of the discount
 *         end_discount_date:
 *           type: string
 *           format: date
 *           description: End date of the discount
 *
 *     PackageResponseDto:
 *       allOf:
 *         - $ref: '#/components/schemas/CreatePackageDto'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Auto-generated ID of the package
 *             package_details:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageDetailResponse'
 *             package_categories:
 *               $ref: '#/components/schemas/PackageCategoryResponse'
 *       example:
 *         id: "72f1ea02-1f8b-471b-b7bf-c29e3f003db0"
 *         restaurant_id: "dc930b4f-dfef-47f5-99ca-75a7983975a3"
 *         name: "Family Feast"
 *         description: "A full meal package for a family of four."
 *         category_id: "9e42e7eb-4402-475f-81c2-7d1dba0cbc52"
 *         discount: 10
 *         start_discount_date: "2023-10-01"
 *         end_discount_date: "2023-10-31"
 *         package_details:
 *           - id: "0979bdaf-303c-443c-b62a-ab2856cabd8d"
 *             name: "Family 2 Standard Buffet 10 เนื้อ"
 *             description: "บุฟเฟ่ต์มาตรฐานสำหรับ 10 ท่าน พร้อมเนื้อคุณภาพดี"
 *             old_price: 300
 *             price: 270
 *             has_discount: true
 *         package_categories:
 *           id: "9e42e7eb-4402-475f-81c2-7d1dba0cbc52"
 *           name: "ท้องแตก"
 */

/**
 * @swagger
 * tags:
 *   name: Packages
 *   description: Package management API
 */

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePackageDto'
 *     responses:
 *       201:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponseDto'
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: List of all packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageResponseDto'
 *       500:
 *         description: Server error
 */
router.post("/packages", addPackage);
router.get("/packages", fetchPackages);

/**
 * @swagger
 * /api/packages/category/{category_id}/{restaurant_id}:
 *   get:
 *     summary: Get packages by category ID and restaurant ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package category
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to filter packages
 *     responses:
 *       200:
 *         description: List of packages in the given category and restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageResponseDto'
 *       404:
 *         description: No packages found
 *       500:
 *         description: Server error
 */
router.get("/packages/category/:category_id/:restaurant_id", fetchPackagesByCategory);


/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package
 *     responses:
 *       200:
 *         description: Package details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponseDto'
 *       404:
 *         description: Package not found
 *
 *   put:
 *     summary: Update a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePackageDto'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponseDto'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Package not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package to delete
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/packages/promotions/top:
 *   get:
 *     summary: Get top 5 packages with the highest discount (including images)
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: List of top 5 promotional packages with images
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
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   discount:
 *                     type: number
 *                   start_discount_date:
 *                     type: string
 *                     format: date
 *                   end_discount_date:
 *                     type: string
 *                     format: date
 *                   images:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         url:
 *                           type: string
 *                         filename:
 *                           type: string
 *       500:
 *         description: Server error
 */
router.get("/packages/promotions/top", fetchTopPromotions);
router.get("/packages/:id", fetchPackageById);
router.put("/packages/:id", modifyPackage);
router.delete("/packages/:id", removePackage);

export default router;
