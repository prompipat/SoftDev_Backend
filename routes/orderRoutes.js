import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
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
 *         - package_id
 *         - restaurant_id
 *         - start_time
 *         - end_time
 *         - package_detail_id
 * 
 *       properties:
 *       status:
 *           type: string
 *           description: status of the order
 *       location:
 *           type: string
 *           description: location of the event
 *       package_id:
 *           type: foreign key
 *           description: id of the package
 *       restaurant_id:
 *           type: foreign key
 *           description: id of the restaurant that will fulfill the order
 *       start_time:
 *           type: string 
 *           format: date-time
 *           description: start time of the event
 *       end_time:
 *          type: string
 *          format: date-time
 *          description: end time of the event
 *       event_date:
 *          type: date
 *          format: date-time
 *          description: date of the event
 *       message:
 *          type: string
 *          description: additional message for the order
 *       package_detail_id:
 *          type: foreign key
 *          description: id of the package detail
 *       example:
 *         status: pending
 *         location: "123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900"
 *         package_id: "uuid-v4-string"
 *         restaurant_id: "uuid-v4-string"
 *         start_time: "10:00:00Z"
 *         end_time: "14:00:00Z"
 *         event_date: "2023-10-10"
 *         message: "กรุณาเตรียมอาหารให้ทันเวลานะครับ"
 *         package_detail_id: "uuid-v4-string"
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
router.post("/orders", authMiddleware, addOrder);
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
router.get("/orders/:id", authMiddleware ,fetchOrderById);
router.put("/orders/:id",authMiddleware, modifyOrder);
router.delete("/orders/:id", authMiddleware,removeOrder);

export default router;