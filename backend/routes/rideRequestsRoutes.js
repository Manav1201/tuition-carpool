const express = require('express');
const router = express.Router();
const RideRequest = require('../models/RideRequest');
 
// 🔥 GET all ride requests for a tutor's batches
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    // 1. Find all batches by this tutor
    const Batch = require('../models/Batch'); // import Batch model
    const batches = await Batch.find({ tutorId });
    const batchIds = batches.map(batch => batch._id);

    // 2. Find all ride requests for those batches
    const rides = await RideRequest.find({ batchId: { $in: batchIds } })
      .populate('parentId', 'name')    // get parent name
      .populate('batchId', 'subject'); // get batch subject

    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PATCH - update status (approved / rejected)
router.patch('/:rideId/status', async (req, res) => {
  const { rideId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedRide = await RideRequest.findByIdAndUpdate(
      rideId,
      { status },
      { new: true }
    );

    if (!updatedRide) return res.status(404).json({ error: 'Ride not found' });

    res.json(updatedRide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const ride = new RideRequest(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: Fetch ride requests for a parent
router.get('/parent/:parentId', async (req, res) => {
  try {
    const rides = await RideRequest.find({ parentId: req.params.parentId }).populate('batchId');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
