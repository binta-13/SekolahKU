const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

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
 * /courses:
 *   post:
 *     description: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
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
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
