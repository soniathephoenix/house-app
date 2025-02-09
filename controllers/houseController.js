const { createHouse, getHouses } = require('../models/houseModel');
const path = require('path');

async function createHouseEntry(req, res) {
  try {
    console.log('Received form data:', req.body);

    // Ensure the fields are parsed into correct data types
    const houseData = {
      energy_efficiency: req.body.energy_efficiency,
      bedrooms: parseInt(req.body.bedrooms),
      safety: req.body.safety === 'true' || req.body.safety === 'safe',
      distance_work: parseFloat(req.body.distance_work),
      distance_pickleball: parseFloat(req.body.distance_pickleball),
      view_marina: req.body.view_marina === 'true',
      price: parseFloat(req.body.price),
      image_url: req.file ? `/uploads/${req.file.filename}` : null
    };

    console.log('Data to be inserted:', houseData);

    // Insert the house into Supabase
    const newHouse = await createHouse(houseData);

    console.log('New house added:', newHouse);

    // Return the inserted data as JSON response
    res.status(201).json(newHouse);
  } catch (error) {
    console.error('Error in createHouseEntry:', error);
    res.status(500).json({ error: error.message });
  }
}

async function getHouseEntries(req, res) {
  try {
    const houses = await getHouses();
    console.log('Fetched houses:', houses);
    res.json(houses);
  } catch (error) {
    console.error('Error in getHouseEntries:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createHouseEntry, getHouseEntries };
