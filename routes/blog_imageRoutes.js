import express from "express";
import {
  addBlog_image,
  fetchBlog_images,
  fetchBlog_imageById,
  modifyBlog_image,
  removeBlog_image
} from "../controllers/blog_imageController.js";



const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog_image:
 *       type: object
 *       required:
 *         - url
 *         - blog_id
 *       properties:
 *       url:
 *           type: string
 *           description: url of the blog image
 *       blog_id:
 *          type: foreign key
 *          description: id of the blog associated with the image   
 *       example:
 *        url: "https://example.com/image.jpg"
 *        blog_id: "d290f1ee-6c54-4b01-90e6-d701748f0851"


 */

/**
 * @swagger
 * /api/blog_images:
 *   post:
 *     summary: Create a new blog image
 *     tags: [Blog_images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog_image'
 *     responses:
 *       201:
 *         description:  Blog image created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog_image'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all blog images
 *     tags: [Blog_images]
 *     responses:
 *       200:
 *         description: List of all blog images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog_image'
 *       500:
 *         description: Server error
 */
router.post("/blog_images", addBlog_image);
router.get("/blog_images", fetchBlog_images);


/**
 * @swagger
 * /api/blog_images/{id}:
 *   get:
 *     summary: Get a blog images by ID
 *     tags: [Blog_images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog image
 *     responses:
 *       200:
 *         description: blog image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog_image'
 *       404:
 *         description: Blog image not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a Blog image
 *     tags: [Blog_images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog_image'
 *     responses:
 *       200:
 *         description: Updated Blog image details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog_image'
 *       404:
 *         description: Blog image not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a Blog image
 *     tags: [Blog_images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the Blog image
 *     responses:
 *       200:
 *         description: Blog image deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/blog_images/:id", fetchBlog_imageById);
router.put("/blog_images/:id", modifyBlog_image);
router.delete("/blog_images/:id", removeBlog_image);

export default router;