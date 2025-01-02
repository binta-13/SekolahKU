const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // Harus dengan path relatif
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authMiddleware, usersController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', authMiddleware, usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     description: Delete a user
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.put('/:id', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
module.exports = router;
