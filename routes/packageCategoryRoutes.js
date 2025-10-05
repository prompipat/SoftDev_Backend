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
 *     PackageDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the package detail
 *         name:
 *           type: string
 *           description: Name of the package detail
 *         description:
 *           type: string
 *           description: Description of the package detail
 *         price:
 *           type: number
 *           format: float
 *           description: Current price (may include discount)
 *         old_price:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: Original price before discount (null if no discount)
 *         has_discount:
 *           type: boolean
 *           description: Indicates if the package detail currently has a discount
 *       example:
 *         id: "pdetail-001"
 *         name: "Family 4 Buffet"
 *         description: "อาหารสำหรับ 4 ท่าน พร้อมของหวาน"
 *         old_price: 1000
 *         price: 850
 *         has_discount: true
 *
 *     PackageInCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the package
 *         name:
 *           type: string
 *           description: Name of the package
 *         description:
 *           type: string
 *           description: Description of the package
 *         discount:
 *           type: number
 *           format: float
 *           description: Discount percentage for the package
 *         start_discount_date:
 *           type: string
 *           format: date
 *           description: Start date of the discount
 *         end_discount_date:
 *           type: string
 *           format: date
 *           description: End date of the discount
 *         package_details:
 *           type: array
 *           description: List of package details belonging to this package
 *           items:
 *             $ref: '#/components/schemas/PackageDetail'
 *       example:
 *         id: "pkg-001"
 *         name: "Luxury Buffet Set"
 *         description: "ชุดอาหารหรูหราพร้อมไวน์"
 *         discount: 15
 *         start_discount_date: "2025-10-01"
 *         end_discount_date: "2025-10-31"
 *         package_details:
 *           - id: "pd-101"
 *             name: "Standard Buffet"
 *             description: "บุฟเฟ่ต์มาตรฐาน"
 *             old_price: 500
 *             price: 425
 *             has_discount: true
 *
 *     PackageCategoryWithPackages:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the package category
 *         name:
 *           type: string
 *           description: Name of the package category
 *         packages:
 *           type: array
 *           description: List of packages under this category (with package details)
 *           items:
 *             $ref: '#/components/schemas/PackageInCategory'
 *       example:
 *         id: "cat-001"
 *         name: "บุฟเฟ่ต์สุดคุ้ม"
 *         packages:
 *           - id: "pkg-001"
 *             name: "Luxury Buffet Set"
 *             description: "ชุดอาหารหรูหราพร้อมไวน์"
 *             discount: 15
 *             start_discount_date: "2025-10-01"
 *             end_discount_date: "2025-10-31"
 *             package_details:
 *               - id: "pd-101"
 *                 name: "Standard Buffet"
 *                 description: "บุฟเฟ่ต์มาตรฐาน"
 *                 old_price: 500
 *                 price: 425
 *                 has_discount: true
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
 *     summary: Get package categories by restaurant ID (includes packages and package details)
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
 *         description: List of categories with their packages and package details
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
