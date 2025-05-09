const express = require('express');
const mysql = require('mysql2/promise'); // Sử dụng promise-based API
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
app.get('/api/bookings', async (req, res) => {
  try {
    const { date, locationId, sportTypeId} = req.query;
    console.log('Fetching bookings for date:', date, 'location:', locationId, 'sportTypeId: ', sportTypeId);
    
    const query = `
      SELECT 
        b.BookingID,
        c.CourtNumber AS court,
        DATE(b.BookingDate) AS date,
        HOUR(b.StartTime) AS time,
        b.CustomerName AS user,
        c.HourlyRate AS price,
        l.LocationName AS location
      FROM Bookings b
      JOIN Courts c ON b.CourtID = c.CourtID
      JOIN Locations l ON c.LocationID = l.LocationID
      WHERE b.BookingDate = ? 
        AND c.LocationID = ? 
        AND c.SportTypeID = ?
    `;
    
    const [results] = await pool.query(query, [date, locationId, sportTypeId]);
    console.log('Booking results:', results);
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
// API lấy danh sách courts theo location và sport type
app.get('/api/courts', async (req, res) => {
  try {
    const { locationId, sportTypeId} = req.query;
    console.log('Fetching courts for location:', locationId, 'sportTypeId:', sportTypeId);

    const query = `
      SELECT 
        c.CourtID,
        c.CourtNumber AS court,
        l.LocationName AS location,
        s.SportName AS sportType,
        c.HourlyRate AS price
      FROM Courts c
      JOIN Locations l ON c.LocationID = l.LocationID
      JOIN SportTypes s ON c.SportTypeID = s.SportTypeID
      WHERE c.LocationID = ? 
        AND c.SportTypeID = ?
    `;

    const [results] = await pool.query(query, [locationId, sportTypeId]);
    console.log('Courts results:', results);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'No courts found for the specified criteria' });
    }
    
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// API lấy danh sách sport types
app.get('/api/sporttypes', async (req, res) => {
  try {
    const query = 'SELECT * FROM SportTypes';
    const [results] = await pool.query(query);
    res.json(results);
    console.log('Sporttype results:', results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// API lấy danh sách locations
app.get('/api/locations', async (req, res) => {
  try {
    const { sportcode } = req.query; // Lấy sportcode từ query parameters

    // Base query với JOIN để lọc theo sportcode
    let locationQuery = `
      SELECT 
        l.*,
        (SELECT AVG(r.Rating) FROM location_reviews r WHERE r.LocationID = l.LocationID) AS AverageRating,
        (SELECT i.ImageUrl FROM location_images i WHERE i.LocationID = l.LocationID AND i.IsPrimary = 1 LIMIT 1) AS PrimaryImageUrl
      FROM Locations l
      INNER JOIN courts c ON l.LocationID = c.LocationID
      INNER JOIN sporttypes s ON c.SportTypeID = s.SportTypeID
      WHERE 1=1
    `;

    const queryParams = [];

    // Thêm điều kiện lọc nếu có sportcode
    if (sportcode) {
      locationQuery += ` AND s.SportCode = ?`;
      queryParams.push(sportcode);
    }

    // Thêm DISTINCT để tránh trùng lặp địa điểm
    locationQuery = locationQuery.replace('SELECT', 'SELECT DISTINCT');

    const [locations] = await pool.query(locationQuery, queryParams);

    // Get features for each location
    const featuresQuery = 'SELECT * FROM location_features WHERE LocationID = ?';
    
    // Enhance each location with its features
    const enhancedLocations = await Promise.all(
      locations.map(async (location) => {
        const [features] = await pool.query(featuresQuery, [location.LocationID]);
        return {
          ...location,
          features: features[0] || null,
        };
      })
    );
    
    res.json(enhancedLocations);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Database error', 
      details: err.message 
    });
  }
});






// API tạo booking mới (phiên bản cải tiến)
app.post('/api/bookings', async (req, res) => {
  try {
    const { 
      courtId, 
      locationId, 
      sportTypeId, 
      date, 
      time, 
      customerName = 'Khách vãng lai', 
      customerPhone = null 
    } = req.body;
    
    // Validate input
    if (!courtId || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const startTime = `${time}:00:00`;
    const endTime = `${parseInt(time) + 1}:00:00`;
    
    const insertQuery = `
      INSERT INTO Bookings 
        (CourtID, LocationID, SportTypeID, BookingDate, StartTime, EndTime, CustomerName, CustomerPhone, Status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    `;
    
    const [result] = await pool.query(
      insertQuery,
      [courtId, locationId, sportTypeId, date, startTime, endTime, customerName, customerPhone]
    );
    
    res.json({ 
      success: true, 
      bookingId: result.insertId,
      courtId,
      date,
      time,
      customerName
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Failed to create booking',
      details: err.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});