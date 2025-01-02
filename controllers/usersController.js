const User = require('../models/user'); // Import model User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Ambil semua data pengguna
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      created_at: new Date(), // Isi kolom created_at
      updated_at: new Date(), // Isi kolom updated_at
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name,
      email,
      role,
      password: hashedPassword,
      updated_at: new Date(), // Update kolom updated_at
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await User.destroy({ where: { id } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      created_at: new Date(), // Isi kolom created_at
      updated_at: new Date(), // Isi kolom updated_at
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      'secretkey', // Gunakan kunci rahasia yang aman
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user and generate JWT token
// Login user and generate JWT token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'secretkey', // Use a strong and secure key
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

