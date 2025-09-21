// restaurantEventCategoryRoutes.js
import express from "express";
import {
  addEventCategory,
  fetchEventCategories,
  fetchEventCategoryById,
  modifyEventCategory,
  removeEventCategory
} from "../controllers/restaurantEventCategoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EventCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the event category
 *         name:
 *           type: string
 *           description: Event category's unique name
 *       example:
 *         name: "Birthday Party"
 */

/**
 * @swagger
 * /api/event-categories:
 *   post:
 *     summary: Create a new event category
 *     tags: [EventCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCategory'
 *     responses:
 *       201:
 *         description: Event category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventCategory'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all event categories
 *     tags: [EventCategories]
 *     responses:
 *       200:
 *         description: List of all event categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventCategory'
 *       500:
 *         description: Server error
 */
router.post("/event-categories", addEventCategory);
router.get("/event-categories", fetchEventCategories);

/**
 * @swagger
 * /api/event-categories/{id}:
 *   get:
 *     summary: Get an event category by ID
 *     tags: [EventCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event category
 *     responses:
 *       200:
 *         description: Event category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventCategory'
 *       404:
 *         description: Event category not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update an event category
 *     tags: [EventCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCategory'
 *     responses:
 *       200:
 *         description: Updated event category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventCategory'
 *       404:
 *         description: Event category not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete an event category
 *     tags: [EventCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event category
 *     responses:
 *       200:
 *         description: Event category deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/event-categories/:id", fetchEventCategoryById);
router.put("/event-categories/:id", modifyEventCategory);
router.delete("/event-categories/:id", removeEventCategory);

export default router;
