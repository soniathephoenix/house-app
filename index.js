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

// Serve uploaded images statically (ONLY works locally, not on Render)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use API routes under the "/api" prefix
app.use('/api', houseRoutes);

// Serve front-end static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

