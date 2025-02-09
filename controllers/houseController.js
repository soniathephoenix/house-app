const { createHouse, getHouses, deleteHouse } = require('../models/houseModel');
const path = require('path');

async function createHouseEntry(req, res) {
  try {
    console.log('✅ Received form data:', req.body);

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

    console.log('📌 Data to be inserted:', houseData);

    const newHouse = await createHouse(houseData);

    console.log('🏠 New house added:', newHouse);
    res.status(201).json(newHouse);
  } catch (error) {
    console.error('❌ Error in createHouseEntry:', error);
    res.status(500).json({ error: error.message });
  }
}

async function getHouseEntries(req, res) {
  try {
    const houses = await getHouses();
    console.log('📌 Fetched houses:', houses);
    res.json(houses);
  } catch (error) {
    console.error('❌ Error in getHouseEntries:', error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteHouseEntry(req, res) {
  try {
    const houseId = req.params.id;
    console.log(`🗑️ Deleting house with ID: ${houseId}`);

    const success = await deleteHouse(houseId);

    if (success) {
      res.status(200).json({ message: '✅ House deleted successfully' });
    } else {
      res.status(404).json({ error: '❌ House not found' });
    }
  } catch (error) {
    console.error('❌ Error in deleteHouseEntry:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createHouseEntry, getHouseEntries, deleteHouseEntry };
