const express = require('express');
const router = express.Router();

const Student = require('../models/Student'); // Model import

// 🔹 GET — saare students laao
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('batchId');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST — ek student add karo
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
