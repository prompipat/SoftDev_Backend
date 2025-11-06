import express from "express";
import {
  addPackageDetail,
  fetchPackageDetails,
  fetchPackageDetailById,
  removePackageDetail,
  modifyPackageDetail,
} from "../controllers/packageDetailController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrUpdatePackageDetail:
 *       type: object
 *       required:
 *         - package_id
 *         - name
 *         - price
 *         - description
 *       properties:
 *         package_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the package this detail belongs to
 *         name:
 *           type: string
 *           description: The name of the package detail
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the package detail
 *         description:
 *           type: string
 *           description: The description of the package detail
 *       example:
 *         package_id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "Standard Buffet 10 เนื้อ"
 *         price: 300
 *         description: "บุฟเฟ่ต์มาตรฐานสำหรับ 10 ท่าน พร้อมเนื้อคุณภาพดี"
 *
 *     PackageDetailResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID of the package detail
 *         package_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the package this detail belongs to
 *         name:
 *           type: string
 *           description: The name of the package detail
 *         description:
 *           type: string
 *           description: The description of the package detail
 *         price:
 *           type: number
 *           format: float
 *           description: The current (possibly discounted) price
 *         old_price:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: The original price before discount (null if no discount)
 *         has_discount:
 *           type: boolean
 *           description: Indicates whether this package detail currently has a discount
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         package_id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "Standard Buffet 10 เนื้อ"
 *         description: "บุฟเฟ่ต์มาตรฐานสำหรับ 10 ท่าน พร้อมเนื้อคุณภาพดี"
 *         old_price: 300
 *         price: 270
 *         has_discount: true
 */

/**
 * @swagger
 * tags:
 *   name: PackageDetails
 *   description: Manage package detail data
 */

/**
 * @swagger
 * /api/package-details:
 *   post:
 *     summary: Create a new package detail
 *     tags: [PackageDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrUpdatePackageDetail'
 *     responses:
 *       201:
 *         description: Package detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageDetailResponse'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all package details
 *     tags: [PackageDetails]
 *     responses:
 *       200:
 *         description: List of all package details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageDetailResponse'
 *       500:
 *         description: Server error
 */
router.post("/package-details", addPackageDetail);
router.get("/package-details", fetchPackageDetails);

/**
 * @swagger
 * /api/package-details/{id}:
 *   get:
 *     summary: Get a package detail by ID
 *     tags: [PackageDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package detail
 *     responses:
 *       200:
 *         description: Package detail details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageDetailResponse'
 *       404:
 *         description: Package detail not found
 *
 *   put:
 *     summary: Update a package detail by ID
 *     tags: [PackageDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrUpdatePackageDetail'
 *     responses:
 *       200:
 *         description: Package detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageDetailResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Package detail not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a package detail by ID
 *     tags: [PackageDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package detail
 *     responses:
 *       200:
 *         description: Package detail deleted successfully
 *       404:
 *         description: Package detail not found
 *       500:
 *         description: Server error
 */
router.get("/package-details/:id", fetchPackageDetailById);
router.put("/package-details/:id", modifyPackageDetail);
router.delete("/package-details/:id", removePackageDetail);

export default router;
