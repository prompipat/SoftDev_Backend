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
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         profile_picture:
 *           type: string
 *       example:
 *         id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *         name: "John Doe"
 *         email: "johndoe@email.com"
 *         role: "customer"
 *         profile_picture: "https://example.com/profile.jpg"
 *
 *     BlogImage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         url:
 *           type: string
 *         filename:
 *           type: string
 *       example:
 *         id: "ae1b2c3d-4567-8901-2345-6789abcdef12"
 *         url: "https://your-bucket.com/images/blog/sample.jpg"
 *         filename: "sample.jpg"
 *
 *     Blog:
 *       type: object
 *       required:
 *         - timestamp
 *         - title
 *         - detail
 *         - restaurant_event_categories
 *         - restaurant_main_category
 *       properties:
 *         id:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         title:
 *           type: string
 *         detail:
 *           type: string
 *         restaurant_event_categories:
 *           type: string
 *         restaurant_main_category:
 *           type: string
 *         user_id:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         blog_image:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlogImage'
 *       example:
 *         id: "81249399-04ba-4778-afc6-ae74d9cfdf21"
 *         timestamp: "2025-12-25T18:30:00Z"
 *         title: "ร้านนี้อร่อยมาก123"
 *         detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *         restaurant_event_categories: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         restaurant_main_category: "c290f1ee-6c54-4b01-90e6-d701748f0852"
 *         user_id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *         user:
 *           id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *           name: "John Doe"
 *           email: "johndoe@email.com"
 *           role: "customer"
 *           profile_picture: "https://example.com/profile.jpg"
 *         blog_image:
 *           - id: "ae1b2c3d-4567-8901-2345-6789abcdef12"
 *             url: "https://your-bucket.com/images/blog/sample.jpg"
 *             filename: "sample.jpg"
 *
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         totalItems:
 *           type: integer
 *         itemsPerPage:
 *           type: integer
 *         hasNextPage:
 *           type: boolean
 *         hasPreviousPage:
 *           type: boolean
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
 *               - restaurant_event_categories
 *               - restaurant_main_category
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               detail:
 *                 type: string
 *               restaurant_event_categories:
 *                 type: string
 *               restaurant_main_category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [timestamp, title, id]
 *           default: timestamp
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of blogs with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedBlogResponse'
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
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               detail:
 *                 type: string
 *               restaurant_event_categories:
 *                 type: string
 *               restaurant_main_category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *
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
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.get("/blogs/:id", fetchBlogById);
router.put("/blogs/:id", authMiddleware, modifyBlog);
router.delete("/blogs/:id", authMiddleware, removeBlog);

export default router;
