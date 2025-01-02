const express = require('express');
const router = express.Router();
const userCoursesController = require('../controllers/userCoursesController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /userCourses:
 *   get:
 *     description: Get all user-courses
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserCourse'
 */
router.get('/', userCoursesController.getAllUserCourses);

/**
 * @swagger
 * /userCourses:
 *   post:
 *     description: Create a new user-course relation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCourse'
 *     responses:
 *       201:
 *         description: User-Course relation created successfully
 */
router.post('/', userCoursesController.createUserCourse);

/**
 * @swagger
 * /userCourses/{id}:
 *   put:
 *     description: Update a user-course relation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCourse'
 *     responses:
 *       200:
 *         description: User-Course updated successfully
 *   delete:
 *     description: Delete a user-course relation
 *     responses:
 *       200:
 *         description: User-Course relation deleted successfully
 */
router.get('/', authMiddleware, userCoursesController.getAllUserCourses);
router.post('/', authMiddleware, userCoursesController.createUserCourse);
router.put('/:id', authMiddleware, userCoursesController.updateUserCourse);
router.delete('/:id', authMiddleware, userCoursesController.deleteUserCourse);

module.exports = router;
