const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /courses:
 *   get:
 *     description: Get all courses
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', coursesController.getAllCourses);

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the course
 *         name:
 *           type: string
 *           description: Name of the course
 *         description:
 *           type: string
 *           description: Description of the course
 *       required:
 *         - name
 *         - description
 */
router.post('/', coursesController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     description: Update a course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *   delete:
 *     description: Delete a course
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.get('/', authMiddleware, coursesController.getAllCourses);
router.post('/', authMiddleware, coursesController.createCourse);
router.put('/:id', authMiddleware, coursesController.updateCourse);
router.delete('/:id', authMiddleware, coursesController.deleteCourse);

module.exports = router;
