import express from "express";
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
 *         - user_id
 *       properties:
 *         timestamp:
 *           type: timestamp
 *           description: timestamp of the blog creation
 *       title:
 *           type: string
 *           description: title of the blog
 *       detail:    
 *           type: string
 *           description: detail of the blog
 *       user_id:
 *           type: foreign key
 *           description: id of the user who created the blog   
 *       example:
 *         timestamp: "2025-12-25T18:30:00Z"
 *         title: "ร้านนี้อร่อยมาก"
 *         detail: "ร้านนี้มีอาหารหลากหลายและรสชาติดีมากๆ แนะนำให้ลอง!"
 *         user_id: "21e7012f-2939-4fba-b295-9208e324dd3b"

 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description:  Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server error
 */
router.post("/blogs", addBlog);
router.get("/blogs", fetchBlogs);


/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blogs by ID
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
 *         description: blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Updated Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Blog
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/blogs/:id", fetchBlogById);
router.put("/blogs/:id", modifyBlog);
router.delete("/blogs/:id", removeBlog);

export default router;