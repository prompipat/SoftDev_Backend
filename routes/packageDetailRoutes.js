import{
    addPackageDetail,
    fetchPackageDetails,
    fetchPackageDetailById,
    removePackageDetail,
    modifyPackageDetail
} from "../controllers/packageDetailController.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PackageDetail:
 *       type: object
 *       required:
 *         - package_id
 *         - name
 *         - price
 *         - description
 *       properties:
 *         package_id:
 *           type: uuid
 *           description: The ID of the package this detail belongs to
 *         name:
 *           type: string
 *           description: The name of the package detail
 *         price:
 *           type: integer
 *           description: The price of the package detail
 *         description:
 *           type: string
 *           description: The description of the package detail
 * 
 *       example:
 *         package_id: 123e4567-e89b-12d3-a456-426614174000
 *         name: Standard Buffet 10 เนื้อ
 *         price: 300
 *         description: บุฟเฟ่ต์มาตรฐานสำหรับ 10 ท่าน พร้อมเนื้อคุณภาพดี
 */

/**
 * @swagger
 * /api/package-details:
 *   post:
 *     summary: create a new package detail
 *     tags: [PackageDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageDetail'
 *     responses:
 *       201:
 *         description: Package detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageDetail'
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
 *                 $ref: '#/components/schemas/PackageDetail'
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
 *               $ref: '#/components/schemas/PackageDetail'
 *       404:
 *         description: Package detail not found
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
 *             $ref: '#/components/schemas/PackageDetail'
 *     responses:
 *       200:
 *         description: Package detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageDetail'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Package detail not found
 *       500:
 *         description: Server error
 */


router.get("/package-details/:id", fetchPackageDetailById);
router.put("/package-details/:id", modifyPackageDetail);
router.delete("/package-details/:id", removePackageDetail);

export default router;