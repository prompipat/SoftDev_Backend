import express from "express";
import multer from "multer";
import {
  addRestaurantImage,
  fetchRestaurantImages,
  fetchRestaurantImageById,
  modifyRestaurantImage,
  removeRestaurantImage,
} from "../controllers/restaurantImageController.js";

const router = express.Router();
const upload = multer(); // memory storage by default

/**
 * @swagger
 * tags:
 *   name: RestaurantImages
 *   description: API for managing restaurant images
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantImage:
 *       type: object
 *       required:
 *         - url
 *         - restaurant_id
 *         - filename
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the image
 *         url:
 *           type: string
 *           description: Public URL of the image
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant this image belongs to
 *         filename:
 *           type: string
 *           description: Unique filename of the image stored in Supabase
 *       example:
 *         id: "1"
 *         url: "https://example.supabase.co/storage/v1/object/public/Images/restaurant/123-uuid.png"
 *         restaurant_id: "123"
 *         filename: "123-uuid.png"
 */

/**
 * @swagger
 * /api/restaurants-images:
 *   post:
 *     summary: Upload a new restaurant image
 *     tags: [RestaurantImages]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - restaurant_id
 *               - file
 *             properties:
 *               restaurant_id:
 *                 type: string
 *                 description: Restaurant ID the image belongs to
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Restaurant image uploaded successfully
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Restaurant image deleted successfully
 *       404:
 *         description: Restaurant image not found
 *       500:
 *         description: Server error
 */

router.post("/restaurants-images", upload.single("file"), addRestaurantImage);

router.get("/restaurants-images", fetchRestaurantImages);
router.get("/restaurants-images/:id", fetchRestaurantImageById);
router.put("/restaurants-images/:id", modifyRestaurantImage);
router.delete("/restaurants-images/:id", removeRestaurantImage);

export default router;
