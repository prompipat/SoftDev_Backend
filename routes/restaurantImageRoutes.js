import express from "express";
import {
  addRestaurantImage,
  fetchRestaurantImages,
  fetchRestaurantImageById,
  modifyRestaurantImage,
  removeRestaurantImage,
} from "../controllers/restaurantImageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantImage:
 *       type: object
 *       required:
 *         - url
 *         - restaurant_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the image
 *         url:
 *           type: string
 *           description: Image URL
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant this image belongs to
 *       example:
 *         url: "https://example.com/image.jpg"
 *         restaurant_id: "123"
 */

/**
 * @swagger
 * /api/restaurants-images:
 *   post:
 *     summary: Upload a new restaurant image
 *     tags: [RestaurantImages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantImage'
 *     responses:
 *       201:
 *         description: Restaurant image created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantImage'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all restaurant images
 *     tags: [RestaurantImages]
 *     responses:
 *       200:
 *         description: List of all restaurant images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RestaurantImage'
 *       500:
 *         description: Server error
 */
router.post("/restaurants-images", addRestaurantImage);
router.get("/restaurants-images", fetchRestaurantImages);

/**
 * @swagger
 * /api/restaurants-images/{id}:
 *   get:
 *     summary: Get a restaurant image by ID
 *     tags: [RestaurantImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant image
 *     responses:
 *       200:
 *         description: Restaurant image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantImage'
 *       404:
 *         description: Restaurant image not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a restaurant image
 *     tags: [RestaurantImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantImage'
 *     responses:
 *       200:
 *         description: Updated restaurant image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantImage'
 *       404:
 *         description: Restaurant image not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a restaurant image
 *     tags: [RestaurantImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant image
 *     responses:
 *       200:
 *         description: Restaurant image deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/restaurants-images/:id", fetchRestaurantImageById);
router.put("/restaurants-images/:id", modifyRestaurantImage);
router.delete("/restaurants-images/:id", removeRestaurantImage);

export default router;
