import { Router } from 'express';
import { findAll, findOne, remove } from '../controllers/sesions.js';
import { roleAuthMiddleware } from '../middlewares/auth.js';

const sesionsRoute = Router();

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Get all sessions
 *     tags: [Sesions]
 *     responses:
 *       200:
 *         description: A list of all sessions
 */
sesionsRoute.get('/', roleAuthMiddleware(['admin']), findAll);

/**
 * @swagger
 * /session/{id}:
 *   get:
 *     summary: Get a session by ID
 *     tags: [Sesions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the session to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session details
 *       404:
 *         description: Session not found
 */
sesionsRoute.get('/:id', roleAuthMiddleware(['admin']), findOne);

/**
 * @swagger
 * /session/{id}:
 *   delete:
 *     summary: Remove a session by ID
 *     tags: [Sesions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the session to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session removed successfully
 *       404:
 *         description: Session not found
 */
sesionsRoute.delete('/:id', roleAuthMiddleware(['admin']), remove);

export default sesionsRoute;
