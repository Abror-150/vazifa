import { Router } from 'express';
import {
  Create,
  findAll,
  findOne,
  remove,
  update,
} from '../controllers/category.js';
import { roleAuthMiddleware } from '../middlewares/auth.js';

let categoryRoute = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of all categories
 */
categoryRoute.get('/', findAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
categoryRoute.get('/:id', findOne);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
categoryRoute.post('/', roleAuthMiddleware(['admin']), Create);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 */
categoryRoute.patch(
  '/:id',
  roleAuthMiddleware(['admin', 'super_admin']),
  update
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Remove a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category removed successfully
 *       404:
 *         description: Category not found
 */
categoryRoute.delete('/:id', roleAuthMiddleware(['admin']), remove);

export default categoryRoute;
