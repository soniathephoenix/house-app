// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const houseRoutes = require('./routes/houseRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use API routes under the "/api" prefix
app.use('/api', houseRoutes);

// (Optional) Serve front-end static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
