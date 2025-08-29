import express from "express";
import {
  addPackageImage,
  fetchPackageImages,
  fetchPackageImageById,
  modifyPackageImage,
  removePackageImage,
} from "../controllers/packageImageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PackageImage:
 *       type: object
 *       required:
 *         - url
 *         - package_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the package image
 *         url:
 *           type: string
 *           description: Image URL
 *         package_id:
 *           type: string
 *           description: ID of the package this image belongs to
 *       example:
 *         url: "https://example.com/package-image.jpg"
 *         package_id: "456"
 */

/**
 * @swagger
 * /api/package-images:
 *   post:
 *     summary: Upload a new package image
 *     tags: [PackageImages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageImage'
 *     responses:
 *       201:
 *         description: Package image created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageImage'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all package images
 *     tags: [PackageImages]
 *     responses:
 *       200:
 *         description: List of all package images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PackageImage'
 *       500:
 *         description: Server error
 */
router.post("/package-images", addPackageImage);
router.get("/package-images", fetchPackageImages);

/**
 * @swagger
 * /api/package-images/{id}:
 *   get:
 *     summary: Get a package image by ID
 *     tags: [PackageImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package image
 *     responses:
 *       200:
 *         description: Package image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageImage'
 *       404:
 *         description: Package image not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a package image
 *     tags: [PackageImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PackageImage'
 *     responses:
 *       200:
 *         description: Updated package image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageImage'
 *       404:
 *         description: Package image not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a package image
 *     tags: [PackageImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the package image
 *     responses:
 *       200:
 *         description: Package image deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/package-images/:id", fetchPackageImageById);
router.put("/package-images/:id", modifyPackageImage);
router.delete("/package-images/:id", removePackageImage);

export default router;
