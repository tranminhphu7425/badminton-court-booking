const express = require('express');
const mysql = require('mysql2/promise'); // Sử dụng promise-based API
const cors = require('cors');
const path = require('path');
const { details } = require('framer-motion/client');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database connection pool (sử dụng connection pool để tối ưu hiệu suất)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user:  "root", // Đảm bảo có giá trị mặc định
  password: process.env.DB_PASSWORD || "TranMinhPhu7425*", // Đặt mật khẩu đúng
  database: process.env.DB_NAME || "badmintoncourtmanagement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



// Test database connection
pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

// API lấy danh sách booking theo ngày và location
app.get('/api/bookings', async(req, res) => {
  try{
    const {date, locationId = 1, sportTypeId = 1} = req.query;
    console.log('Fetching bookings for date: ', date, 'location: ', locationId);

    const query = `SELECT 
      b.BookingID,
      c.CourtNumber AS court,
      DATE(b.BookingDate) AS date,
      HOUR(b.StartTime) AS time,
      b.CustomerName AS user,
      c.HourlyRate AS price,
      l.LocationName AS location
    FROM Bookings b
    JOIN Courts c ON b.CourtID = c.CourtID`;
    const [results] = await pool.query(query, [date, locationId, sportTypeId]);
    console.log('Results: ', results);
    res.json(results);
  }
  catch(err)
  {
    console.error('Database error: ', err);
    res.status(500).json({error: 'Internal server error', details: err.message}); 
  }
});


app.get('/api/courts', async (req, res) => {
  try {
    const { locationId = 1, sportTypeId = 1 } = req.query;
    console.log('Fetching courts for location:', locationId, 'sportTypeId:', sportTypeId);

    const query = `
      SELECT 
        c.CourtID,
        c.CourtNumber AS court,
        l.LocationName AS location,
        s.SportTypeName AS sportType,
        c.HourlyRate AS price
      FROM Courts c
      JOIN Locations l ON c.LocationID = l.LocationID
      JOIN SportTypes s ON c.SportTypeID = s.SportTypeID
      WHERE c.LocationID = ? AND c.SportTypeID = ?
    `;

    const [results] = await pool.query(query, [locationId, sportTypeId]);
    console.log('Query results:', results);
    res.json(results);
  }
  catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});




app.get('/api/sportTypes', async (req, res) => {
  try {
    const query = 'SELECT * FROM SportTypes';
    const [results] = await pool.query(query);
    console.log('Sport types results:', results);
  }
  catch (err){
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });

  }
});