import express from "express";
import {
  addFavourite,
  fetchFavourites,
  fetchFavouriteById,
  modifyFavourite,
  removeFavourite
} from "../controllers/favouriteController.js";


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Favourite:
 *       type: object
 *       required:
 *         - user_id
 *         - restaurant_id
 *       properties:
 *         user_id:
 *           type: foreign key
 *           description: id of the user who made the favourite
 *         restaurant_id:
 *           type: foreign key
 *           description: id of the restaurant that is favourited
 *       example:
 *         user_id: "21e7012f-2939-4fba-b295-9208e324dd3b"
 *         restaurant_id: "26eb148f-d644-4560-a87c-b5fe9db64a72"
 */

/**
 * @swagger 
 * /api/favourites:
 *   post:
 *     summary: Create a new favourite
 *     tags: [Favourites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favourite'
 *     responses:
 *       201:
 *         description: Favourite created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favourite'
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get all favourites
 *     tags: [Favourites]
 *     responses:
 *       200:
 *         description: List of all favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favourite'
 *       500:
 *         description: Server error
 */
 
router.post("/favourites", addFavourite);
router.get("/favourites", fetchFavourites);

/**
 * @swagger
 * /api/favourites/{id}:
 *   get:
 *     summary: Get a favourite by ID
 *     tags: [Favourites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favourite
 *     responses:
 *       200:
 *         description: Favourite details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favourite'
 *       404:
 *         description: Favourite not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update a favourite by ID
 *     tags: [Favourites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favourite to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favourite'
 *     responses:
 *       200:
 *         description: Favourite updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favourite'
 *       400:
 *         description: Invalid input
 *
 *   delete:
 *     summary: Delete a favourite by ID
 *     tags: [Favourites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the favourite to delete
 *     responses:
 *       200:
 *         description: Favourite deleted successfully
 *       404:
 *         description: Favourite not found
 *       500:
 *         description: Server error
 */
router.get("/favourites/:id", fetchFavouriteById);
router.put("/favourites/:id", modifyFavourite);
router.delete("/favourites/:id", removeFavourite);

export default router;
