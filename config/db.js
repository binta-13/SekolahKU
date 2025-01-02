const { Sequelize } = require('sequelize');

// Membuat instance Sequelize dengan koneksi pool MySQL
const sequelize = new Sequelize('sekolahku', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,      // Maksimal koneksi
        min: 0,       // Minimal koneksi
        acquire: 30000, // Waktu maksimum untuk menunggu koneksi
        idle: 10000    // Waktu maksimum koneksi idle
    }
});

module.exports = sequelize;
