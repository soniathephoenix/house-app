// controllers/houseController.js
const { createHouse, getHouses } = require('../models/houseModel');
const path = require('path');

async function createHouseEntry(req, res) {
  try {
    // Extract values from form data; note that text fields are in req.body and the uploaded file is in req.file.
    const {
      energy_efficiency,
      bedrooms,
      safety,
      distance_work,
      distance_pickleball,
      view_marina,
      price
    } = req.body;

    // Convert values to the correct data types.
    const houseData = {
      energy_efficiency,
      bedrooms: parseInt(bedrooms),
      // Accept "safe" or "true" as safe, anything else as unsafe:
      safety: (safety === 'true' || safety === 'safe'),
      distance_work: parseFloat(distance_work),
      distance_pickleball: parseFloat(distance_pickleball),
      view_marina: view_marina === 'true',
      price: parseFloat(price),
      image_url: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newHouse = await createHouse(houseData);
    res.status(201).json(newHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getHouseEntries(req, res) {
  try {
    const houses = await getHouses();
    res.json(houses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createHouseEntry, getHouseEntries };
