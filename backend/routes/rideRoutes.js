const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// 🔹 GET — all ride requests
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().populate('batch');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST — new ride request
router.post('/', async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
