const db = require('../config/db');

/**
 * Get all user-courses
 */
exports.getAllUserCourses = (req, res) => {
  db.query('SELECT * FROM userCourse', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

/**
 * Create a new user-course relation (User should only access their own data)
 */
exports.createUserCourse = (req, res) => {
  db.query('INSERT INTO userCourse SET ?', req.body, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

/**
 * Update a user-course relation (User should only access their own data)
 */
exports.updateUserCourse = (req, res) => {
  db.query('UPDATE userCourse SET ? WHERE id = ?', [req.body, req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'User-Course relation updated successfully' });
  });
};

/**
 * Delete a user-course relation (User should only access their own data)
 */
exports.deleteUserCourse = (req, res) => {
  db.query('DELETE FROM userCourse WHERE id = ?', [req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'User-Course relation deleted successfully' });
  });
};
