import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
import {
  addOrder,
  fetchOrders,
  fetchOrderById,
  modifyOrder,
  removeOrder,
  modifyOrderStatus,
  fetchMyOrders
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - location
 *         - event_date
 *         - package_id
 *         - restaurant_id
 *         - start_time
 *         - end_time
 *         - package_detail_id
 *         - participants
 *       properties:
 *         location:
 *           type: string
 *           description: Location of the event
 *         package_id:
 *           type: string
 *           description: ID of the package
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant that will fulfill the order
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: Start time of the event
 *         end_time:
 *           type: string
 *           format: date-time
 *           description: End time of the event
 *         event_date:
 *           type: string
 *           format: date
 *           description: Date of the event
 *         message:
 *           type: string
 *           description: Additional message for the order
 *         package_detail_id:
 *           type: string
 *           description: ID of the package detail
 *         participants:
 *           type: integer
 *           description: Number of participants
 *       example:
 *         location: "123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900"
 *         package_id: "uuid-v4-string"
 *         restaurant_id: "uuid-v4-string"
 *         start_time: "10:00:00Z"
 *         end_time: "14:00:00Z"
 *         event_date: "2023-10-10"
 *         message: "กรุณาเตรียมอาหารให้ทันเวลานะครับ"
 *         package_detail_id: "uuid-v4-string"
 *         participants: 10
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.post("/orders", authMiddleware, addOrder);
router.get("/orders", fetchOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
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
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update an order (full update)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Updated order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update only the order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, waiting for payment, cancel, preparing, finished]
 *             example:
 *               status: "waiting for payment"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid status or input
 *       404:
 *         description: Order not found
 */


/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     summary: Get all orders for the authenticated user with optional status filter
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [all, pending, waiting for payment, cancel, preparing, finished]
 *           default: all
 *         description: Filter orders by status (default = all)
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.get("/orders/me", authMiddleware, fetchMyOrders);
router.get("/orders/:id", authMiddleware, fetchOrderById);
router.put("/orders/:id", authMiddleware, modifyOrder);
router.delete("/orders/:id", authMiddleware, removeOrder);
router.put("/orders/:id/status", authMiddleware, modifyOrderStatus);


/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update only the order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, waiting for payment, cancel, preparing, finished]
 *             example:
 *               status: "waiting for payment"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid status or input
 *       404:
 *         description: Order not found
 */


/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.get("/orders/me", authMiddleware, fetchMyOrders);
router.get("/orders/:id", authMiddleware, fetchOrderById);
router.put("/orders/:id", authMiddleware, modifyOrder);
router.delete("/orders/:id", authMiddleware, removeOrder);
router.put("/orders/:id/status", authMiddleware, modifyOrderStatus);

export default router;
