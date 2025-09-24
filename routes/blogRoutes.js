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
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email address
 *         role:
 *           type: string
 *           description: The user's role
 *         profile_picture:
 *           type: string
 *           description: URL to the user's profile picture
 *       example:
 *         id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *         name: "John Doe"
 *         email: "johndoe@email.com"
 *         role: "customer"
 *         profile_picture: "https://example.com/profile.jpg"
 *    
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
 *         restaurant_event_categories:
 *           type: string
 *           description: ID of the associated restaurant event category
 *         restaurant_main_category:
 *           type: string
 *           description: ID of the associated restaurant main category
 *         user_id:
 *           type: string
 *           description: ID of the user who created the blog
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user who authored the blog post. This is populated on retrieval.
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
 *           password: "password-is-removed" # For example purpose
 *           profile_picture: "https://example.com/profile.jpg"
 *           bio: "User bio"
 *           role: "customer"
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
 *                 description: ID of the associated restaurant event category
 *               restaurant_main_category:
 *                 type: string
 *                 description: ID of the associated restaurant main category
 *             example:
 *               title: "ร้านนี้อร่อยมาก123"
 *               detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *               restaurant_event_categories: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *               restaurant_main_category: "c290f1ee-6c54-4b01-90e6-d701748f0852"
 * 
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *             example:
 *                 data:
 *                    - id: "81249399-04ba-4778-afc6-ae74d9cfdf21"
 *                      timestamp: "2025-12-25T18:30:00Z"
 *                      title: "ร้านนี้อร่อยมาก123"
 *                      detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *                      user_id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *                      restaurant_event_categories: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *                      restaurant_main_category: "c290f1ee-6c54-4b01-90e6-d701748f0852"
 *                      user:
 *                        id: "93a302ba-22bd-4d19-9d72-1a4831a1aaf1"
 *                        name: "John Doe"
 *                        email: "johndoe@email.com"
 *                        role: "customer"
 *                        password: "password-is-removed"
 *                        profile_picture: "https://example.com/profile.jpg"
 *                 pagination:
 *                   currentPage: 1
 *                   totalPages: 5
 *                   totalItems: 47
 *                   itemsPerPage: 10
 *                   hasNextPage: true
 *                   hasPreviousPage: false
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
 *               restaurant_event_categories:
 *                 type: string
 *               restaurant_main_category:
 *                 type: string
 *             example:
 *               title: "ร้านนี้อร่อยมาก123"
 *               detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *               restaurant_event_categories: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *               restaurant_main_category: "c290f1ee-6c54-4b01-90e6-d701748f0852"
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