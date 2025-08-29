import express from "express";
import {
  addVerificationForm,
  fetchVerificationForms,
  fetchVerificationFormById,
  modifyVerificationForm,
  removeVerificationForm,
} from "../controllers/verificationFormController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     VerificationForm:
 *       type: object
 *       required:
 *         - user_id
 *         - restaurant_id
 *         - verification_info
 *         - status
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the admin reviewing the form
 *         restaurant_id:
 *           type: string
 *           description: ID of the restaurant being verified
 *         verification_info:
 *           type: string
 *           description: Additional verification details
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Current status of the verification form
 *       example:
 *         user_id: "12345"
 *         restaurant_id: "67890"
 *         verification_info: "Business license and documents verified"
 *         status: "pending"
 */

/**
 * @swagger
 * /api/verification-forms:
 *   post:
 *     summary: Create a new verification form
 *     tags: [VerificationForms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerificationForm'
 *     responses:
 *       201:
 *         description: Verification form created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationForm'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all verification forms
 *     tags: [VerificationForms]
 *     responses:
 *       200:
 *         description: List of all verification forms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VerificationForm'
 *       500:
 *         description: Server error
 */
router.post("/verification-forms", addVerificationForm);
router.get("/verification-forms", fetchVerificationForms);

/**
 * @swagger
 * /api/verification-forms/{id}:
 *   get:
 *     summary: Get a verification form by ID
 *     tags: [VerificationForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the verification form
 *     responses:
 *       200:
 *         description: Verification form details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationForm'
 *       404:
 *         description: Verification form not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a verification form
 *     tags: [VerificationForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the verification form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerificationForm'
 *     responses:
 *       200:
 *         description: Updated verification form details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationForm'
 *       404:
 *         description: Verification form not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a verification form
 *     tags: [VerificationForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the verification form
 *     responses:
 *       200:
 *         description: Verification form deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/verification-forms/:id", fetchVerificationFormById);
router.put("/verification-forms/:id", modifyVerificationForm);
router.delete("/verification-forms/:id", removeVerificationForm);

export default router;
