const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Mendapatkan token dari header Authorization
  const token = authHeader.split(' ')[1]; // Mengambil bagian token setelah "Bearer"
  if (!token) {
    return res.status(401).json({ message: 'Access denied, malformed token' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Ganti 'your_jwt_secret' dengan kunci JWT Anda
    req.user = decoded; // Menyimpan data yang di-decode di req.user
    next(); // Lanjutkan ke middleware berikutnya
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(400).json({ message: 'Invalid token' });
  }
};
