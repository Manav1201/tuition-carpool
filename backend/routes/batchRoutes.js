const express = require('express');
const router = express.Router();

const Batch = require('../models/Batch'); // Model import

// 🔹 GET — saare batches laao
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find().populate('tutorId', 'name');
 
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /api/batches/code/:joinCode → to find batch by code
router.get('/code/:joinCode', async (req, res) => {
  try {
    const batch = await Batch.findOne({ joinCode: req.params.joinCode });

    if (!batch) return res.status(404).json({ error: 'Invalid join code' });

    res.json(batch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET — parent ke batches
router.get('/parent/:parentId', async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const batches = await Batch.find({ parentId }).populate('tutorId', 'name'); // Tutor ka naam laao
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔹 GET — tutor ke batches
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    const batches = await Batch.find({ tutorId }).populate('parentId', 'name'); // Parent ka naam agar chahiye
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Utility function
const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

router.post('/', async (req, res) => {
  try {
    const batch = new Batch({
      ...req.body,
      joinCode: generateCode(),   // ✅ generate join code here
    });

    await batch.save();
    res.status(201).json(batch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /api/batches/:batchId/enroll
router.post('/:batchId/enroll', async (req, res) => {
  const { batchId } = req.params;
  const { parentId } = req.body;

  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      batchId,
      { parentId },      // 👈 sirf parentId update karna hai
      { new: true }      // 👈 updated document return kare
    );

    if (!updatedBatch) return res.status(404).json({ error: "Batch not found" });

    res.json({ message: "Parent enrolled successfully", batch: updatedBatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
