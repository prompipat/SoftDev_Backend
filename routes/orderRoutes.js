import express from "express";
import {
  addOrder,
  fetchOrders,
  fetchOrderById,
  modifyOrder,
  removeOrder
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - status
 *         - location
 *         - event_date
 *         - participant
 *         - package_id
 *         - user_id
 *         - restaurant_id
 *       properties:
 *         status:
 *           type: string
 *           description: status of the order
 *       location:
 *           type: string
 *           description: location of the event
 *       event_date:    
 *           type: timestamp
 *           description: date of the event
 *       participant:
 *           type: integer
 *           description: number of participants in the event
 *       package_id:
 *           type: foreign key
 *           description: id of the package
 *       user_id:
 *           type: foreign key
 *           description: id of the user who made the order
 *       restaurant_id:
 *           type: foreign key
 *           description: id of the restaurant that will fulfill the order
 *       example:
 *         status: pending
 *         location: "123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900"
 *         event_date: "2025-12-25T18:30:00Z"   
 *         participant: 50
 *         package_id: "uuid-v4-string"
 *         user_id: "uuid-v4-string"
 *         restaurant_id: "uuid-v4-string"
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/order'
 *       500:
 *         description: Server error
 */
router.post("/orders", addOrder);
router.get("/orders", fetchOrders);


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a orders by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Updated Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/orders/:id", fetchOrderById);
router.put("/orders/:id", modifyOrder);
router.delete("/orders/:id", removeOrder);

export default router;