import express from 'express';
import { fileController } from '../controllers/fileController';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';

export const fileRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         filename:
 *           type: string
 *         originalName:
 *           type: string
 *         size:
 *           type: number
 *         uploadedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a JSON file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file or format
 *       401:
 *         description: Unauthorized
 */
fileRouter.post('/upload', auth, upload.single('file'), fileController.uploadFile);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get all uploaded files
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/File'
 */
fileRouter.get('/', auth, fileController.getFiles);

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Get file by ID
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File details and content
 *       404:
 *         description: File not found
 *   delete:
 *     summary: Delete file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 */
fileRouter.get('/:id', auth, fileController.getFileById);
fileRouter.delete('/:id', auth, fileController.deleteFile);