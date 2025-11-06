// restaurantEventCategoryMapRoutes.js
import express from "express";
import {
  addRestaurantEventCategoryMap,
  fetchRestaurantEventCategoryMaps,
  fetchRestaurantEventCategoryMapById,
  modifyRestaurantEventCategoryMap,
  removeRestaurantEventCategoryMap,
} from "../controllers/restaurantEventCategoryMapController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantEventCategoryMap:
 *       type: object
 *       required:
 *         - restaurant_id
 *         - event_category_id
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the mapping
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant
 *         event_category_id:
 *           type: string
 *           description: ID of the event category
 *       example:
 *         restaurant_id: "10"
 *         event_category_id: "5"
 */

/**
 * @swagger
 * /api/restaurant-event-category-maps:
 *   post:
 *     summary: Create a new restaurant-event-category mapping
 *     tags: [RestaurantEventCategoryMaps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantEventCategoryMap'
 *     responses:
 *       201:
 *         description: Mapping created successfully
 *       400:
 *         description: Invalid input or duplicate mapping
 *   get:
 *     summary: Get all restaurant-event-category mappings
 *     tags: [RestaurantEventCategoryMaps]
 *     responses:
 *       200:
 *         description: List of mappings
 */
router.post("/restaurant-event-category-maps", addRestaurantEventCategoryMap);
router.get("/restaurant-event-category-maps", fetchRestaurantEventCategoryMaps);

/**
 * @swagger
 * /api/restaurant-event-category-maps/{id}:
 *   get:
 *     summary: Get a mapping by ID
 *     tags: [RestaurantEventCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     responses:
 *       200:
 *         description: Mapping details
 *       404:
 *         description: Mapping not found
 *   put:
 *     summary: Update a mapping
 *     tags: [RestaurantEventCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantEventCategoryMap'
 *     responses:
 *       200:
 *         description: Updated mapping
 *       404:
 *         description: Mapping not found
 *       400:
 *         description: Invalid update
 *   delete:
 *     summary: Delete a mapping
 *     tags: [RestaurantEventCategoryMaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Mapping ID
 *     responses:
 *       200:
 *         description: Mapping deleted successfully
 *       404:
 *         description: Mapping not found
 */
router.get("/restaurant-event-category-maps/:id", fetchRestaurantEventCategoryMapById);
router.put("/restaurant-event-category-maps/:id", modifyRestaurantEventCategoryMap);
router.delete("/restaurant-event-category-maps/:id", removeRestaurantEventCategoryMap);

export default router;
