const db = require('../config/db');

/**
 * Get all courses
 */
exports.getAllCourses = (req, res) => {
  db.query('SELECT * FROM courses', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

/**
 * Create a new course (Admin only)
 */
exports.createCourse = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  db.query('INSERT INTO courses SET ?', req.body, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

/**
 * Update a course (Admin only)
 */
exports.updateCourse = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  db.query('UPDATE courses SET ? WHERE id = ?', [req.body, req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Course updated successfully' });
  });
};

/**
 * Delete a course (Admin only)
 */
exports.deleteCourse = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  db.query('DELETE FROM courses WHERE id = ?', [req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Course deleted successfully' });
  });
};
