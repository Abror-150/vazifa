import { Router } from 'express';
import {
  findAll,
  findOne,
  login,
  register,
  remove,
  verifyy,
} from '../controllers/user.js';
import { totp } from 'otplib';
import { roleAuthMiddleware } from '../middlewares/auth.js';

const userRoute = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 */
userRoute.get('/', findAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
userRoute.get('/:id', findOne);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
userRoute.post('/register', register);
totp.options = { step: 300, digits: 4 };
/**
 * @swagger
 * /user/verify:
 *   post:
 *     summary: Verify a user's email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification successful
 *       400:
 *         description: Invalid token
 */
userRoute.post('/verify', verifyy);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
userRoute.post('/login', login);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [User]
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O'chiriladigan foydalanuvchining ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully
 *       401:
 *         description: Ruxsatsiz
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

userRoute.delete('/:id', roleAuthMiddleware(['admin']), remove);
export default userRoute;
