import express from "express";

import {
  addPackage,
  fetchPackages,
  fetchPackageById,
  modifyPackage,
  removePackage,
} from "../controllers/packageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the package
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant this package belongs to
 *         name:
 *           type: string
 *           description: Name of the package
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the package
 *         description:
 *           type: string
 *           description: Detailed description of the package
 *       example:
 *         restaurant_id: "2b0c14bd-7bbd-431a-9282-5abe5d461f80"
 *         name: "Family Feast"
 *         price: 49.99
 *         description: "A full meal package for a family of four."
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
 *             $ref: '#/components/schemas/Package'
 *     responses:
 *       201:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
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
 *                 $ref: '#/components/schemas/Package'
 *       500:
 *         description: Server error
 */
router.post("/packages", addPackage);
router.get("/packages", fetchPackages);

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
 *               $ref: '#/components/schemas/Package'
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
 *             $ref: '#/components/schemas/Package'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
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
router.get("/packages/:id", fetchPackageById);
router.put("/packages/:id", modifyPackage);
router.delete("/packages/:id", removePackage);

export default router;
