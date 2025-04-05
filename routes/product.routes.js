import { Router } from 'express';
import { Create, findAll, findOne, remove } from '../controllers/product.js';
import { update } from '../controllers/category.js';
import { roleAuthMiddleware } from '../middlewares/auth.js';

const productRoute = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all products
 */
productRoute.get('/', findAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
productRoute.get('/:id', findOne);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
productRoute.post('/', roleAuthMiddleware(['admin']), Create);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
productRoute.patch(
  '/:id',
  roleAuthMiddleware(['admin', 'super_admin']),
  update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       404:
 *         description: Product not found
 */
productRoute.delete('/:id', roleAuthMiddleware(['admin']), remove);

export default productRoute;
