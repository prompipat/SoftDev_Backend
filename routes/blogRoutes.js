import express from "express";
import { authMiddleware } from "../services/authMiddleware.js";
import {
  addBlog,
  fetchBlogs,
  fetchBlogById,
  modifyBlog,
  removeBlog
} from "../controllers/blogController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - timestamp
 *         - title
 *         - detail
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the blog
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the blog creation
 *         title:
 *           type: string
 *           description: Title of the blog
 *         detail:
 *           type: string
 *           description: Detail of the blog
 *         user_id:
 *           type: string
 *           description: ID of the user who created the blog
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         timestamp: "2025-12-25T18:30:00Z"
 *         title: "ร้านนี้อร่อยมาก"
 *         detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *         user_id: "user123"
 *     
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           description: Current page number
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *         totalItems:
 *           type: integer
 *           description: Total number of items
 *         itemsPerPage:
 *           type: integer
 *           description: Number of items per page
 *         hasNextPage:
 *           type: boolean
 *           description: Whether there is a next page
 *         hasPreviousPage:
 *           type: boolean
 *           description: Whether there is a previous page
 *       example:
 *         currentPage: 1
 *         totalPages: 5
 *         totalItems: 47
 *         itemsPerPage: 10
 *         hasNextPage: true
 *         hasPreviousPage: false
 *     
 *     PaginatedBlogResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Blog'
 *         pagination:
 *           $ref: '#/components/schemas/PaginationInfo'
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timestamp
 *               - title
 *               - detail
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               detail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all blogs with pagination
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [timestamp, title, id]
 *           default: timestamp
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of blogs with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedBlogResponse'
 *             example:
 *               data:
 *                 - id: "550e8400-e29b-41d4-a716-446655440000"
 *                   timestamp: "2025-12-25T18:30:00Z"
 *                   title: "ร้านนี้อร่อยมาก"
 *                   detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *                   user_id: "user123"
 *               pagination:
 *                 currentPage: 1
 *                 totalPages: 5
 *                 totalItems: 47
 *                 itemsPerPage: 10
 *                 hasNextPage: true
 *                 hasPreviousPage: false
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidPage:
 *                 summary: Invalid page parameter
 *                 value:
 *                   error: "Page must be greater than 0"
 *               invalidLimit:
 *                 summary: Invalid limit parameter
 *                 value:
 *                   error: "Limit must be between 1 and 100"
 *               invalidSortBy:
 *                 summary: Invalid sortBy parameter
 *                 value:
 *                   error: "Invalid sortBy field. Allowed: timestamp, title, id"
 *       500:
 *         description: Server error
 */
router.post("/blogs", authMiddleware, addBlog);
router.get("/blogs", fetchBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               detail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *       401:
 *         description: Unauthorized
 */
router.get("/blogs/:id", fetchBlogById);
router.put("/blogs/:id", authMiddleware, modifyBlog);
router.delete("/blogs/:id", authMiddleware, removeBlog);

export default router;