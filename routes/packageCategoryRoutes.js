import express from "express";
import {
  addPackageCategory,
  fetchPackageCategories,
  fetchPackageCategoryById,
  modifyPackageCategory,
  removePackageCategory,
  fetchPackageCategoriesByRestaurant,
} from "../controllers/packageCategoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PackageImage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         url:
 *           type: string
 *         filename:
 *           type: string
 *       example:
 *         id: "fa6d5c3b-1234-4b1a-8fd2-9d2caa78a123"
 *         url: "https://example-bucket.supabase.co/storage/v1/object/public/image/package/family_feast.jpg"
 *         filename: "family_feast.jpg"
 *
 *     PackageDetailWithDiscount:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         old_price:
 *           type: number
 *           nullable: true
 *         has_discount:
 *           type: boolean
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "Family Buffet 10 ท่าน"
 *         description: "บุฟเฟ่ต์สำหรับ 10 ท่าน พร้อมของหวาน"
 *         price: 270
 *         old_price: 300
 *         has_discount: true
 *
 *     PackageWithDetailsAndImages:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         discount:
 *           type: number
 *         package_details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PackageDetailWithDiscount'
 *         package_images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PackageImage'
 *       example:
 *         id: "b42e789a-59b4-44b5-b5cb-c1b9395e5e6b"
 *         name: "Family Feast"
 *         description: "A complete family meal set"
 *         discount: 10
 *         package_details:
 *           - id: "123e4567-e89b-12d3-a456-426614174000"
 *             name: "Family Buffet 10 ท่าน"
 *             description: "บุฟเฟ่ต์สำหรับ 10 ท่าน พร้อมของหวาน"
 *             price: 270
 *             old_price: 300
 *             has_discount: true
 *         package_images:
 *           - id: "fa6d5c3b-1234-4b1a-8fd2-9d2caa78a123"
 *             url: "https://example.com/image/package1.jpg"
 *             filename: "package1.jpg"
 *
 *     PackageCategoryWithPackages:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         packages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PackageWithDetailsAndImages'
 *       example:
 *         id: "9e42e7eb-4402-475f-81c2-7d1dba0cbc52"
 *         name: "บุฟเฟ่ต์"
 *         packages:
 *           - id: "b42e789a-59b4-44b5-b5cb-c1b9395e5e6b"
 *             name: "Family Feast"
 *             description: "A complete family meal set"
 *             discount: 10
 *             package_details:
 *               - id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Family Buffet 10 ท่าน"
 *                 description: "บุฟเฟ่ต์สำหรับ 10 ท่าน พร้อมของหวาน"
 *                 price: 270
 *                 old_price: 300
 *                 has_discount: true
 *             package_images:
 *               - id: "fa6d5c3b-1234-4b1a-8fd2-9d2caa78a123"
 *                 url: "https://example.com/image/package1.jpg"
 *                 filename: "package1.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Package Categories
 *   description: Manage package categories and their packages
 */

/**
 * @swagger
 * /api/package-categories:
 *   post:
 *     summary: Create a new package category
 *     tags: [Package Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all package categories
 *     tags: [Package Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *       500:
 *         description: Server error
 */
router.post("/package-categories", addPackageCategory);
router.get("/package-categories", fetchPackageCategories);

/**
 * @swagger
 * /api/package-categories/{id}:
 *   get:
 *     summary: Get a package category by ID
 *     tags: [Package Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package category details
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update a package category
 *     tags: [Package Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a package category
 *     tags: [Package Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/package-categories/restaurant/{restaurant_id}:
 *   get:
 *     summary: Get package categories by restaurant ID (includes packages, package details and images)
 *     tags: [Package Categories]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant
 *     responses:
 *       200:
 *         description: List of categories with their packages, details and images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageCategoryWithPackages'
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */
router.get("/package-categories/restaurant/:restaurant_id", fetchPackageCategoriesByRestaurant);

router.get("/package-categories/:id", fetchPackageCategoryById);
router.put("/package-categories/:id", modifyPackageCategory);
router.delete("/package-categories/:id", removePackageCategory);

export default router;
