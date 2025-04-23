const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
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

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "TranMinhPhu7425*",
  database: process.env.DB_NAME || "badmintoncourtmanagement"
});

// Kết nối database
db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API lấy danh sách booking theo ngày
app.get('/api/bookings/:date', (req, res) => {
  const date = req.params.date;
  console.log('Fetching bookings for date:', date);
  
  const query = `
  SELECT 
    b.BookingID,
    c.CourtNumber AS court,
    b.BookingDate AS date,
    HOUR(b.StartTime) AS time,  
    b.CustomerName AS user
  FROM Bookings b
  JOIN Courts c ON b.CourtID = c.CourtID
  WHERE b.BookingDate = ?
`;
  
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Query results:', results);
    res.json(results);
  });
});

// API tạo booking mới
app.post('/api/bookings', (req, res) => {
  const { court, date, time, user } = req.body;
  
  // Đầu tiên lấy CourtID từ CourtNumber
  const getCourtIdQuery = 'SELECT CourtID FROM Courts WHERE CourtNumber = ?';
  
  db.query(getCourtIdQuery, [`S0${court}`], (err, courtResults) => {
    if (err || courtResults.length === 0) {
      return res.status(400).json({ error: 'Invalid court number' });
    }
    
    const courtId = courtResults[0].CourtID;
    const startTime = `${time}:00:00`;
    const endTime = `${parseInt(time) + 1}:00:00`;
    
    const insertQuery = `
      INSERT INTO Bookings 
        (CourtID, BookingDate, StartTime, EndTime, CustomerName) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(
      insertQuery,
      [courtId, date, startTime, endTime, user],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to create booking' });
        }
        res.json({ 
          success: true, 
          bookingId: result.insertId,
          court,
          date,
          time,
          user
        });
      }
    );
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Test query
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('Test query result:', results[0].solution);
  });
});