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
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "TranMinhPhu7425*",
  database: process.env.DB_NAME || "badmintoncourtmanagement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

