// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Đổi thành URL frontend của bạn
  credentials: true
}));

app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

// API lấy danh sách sân
app.get('/api/courts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Courts');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API lấy lịch đặt theo ngày
app.get('/api/bookings/:date', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Bookings WHERE BookingDate = ?',
            [req.params.date]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API đặt sân
app.post('/api/bookings', async (req, res) => {
    try {
        const { courtId, date, startTime, endTime, customerName, customerPhone } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Bookings (CourtID, BookingDate, StartTime, EndTime, CustomerName, CustomerPhone) VALUES (?, ?, ?, ?, ?, ?)',
            [courtId, date, startTime, endTime, customerName, customerPhone]
        );
        res.json({ success: true, bookingId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Thêm vào server.js
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});