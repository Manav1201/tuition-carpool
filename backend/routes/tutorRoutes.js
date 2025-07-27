// 1️⃣ Express ko import kar
const express = require('express');

// 2️⃣ Router ka object banao (mini-app)
const router = express.Router();

// 3️⃣ Model import karo — yeh schema hai Tutor ke liye
const Tutor = require('../models/Tutor');


// 🔹 4️⃣ GET route — sab tutors ko bhejne ke liye
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();   // MongoDB se sab tutors laao
    res.json(tutors);                    // Frontend ko bhej do
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 5️⃣ POST route — new tutor add karne ke liye
router.post('/', async (req, res) => {
  try {
    const tutor = new Tutor(req.body);   // frontend se data aaya
    await tutor.save();                  // DB mein save
    res.status(201).json(tutor);         // response mein tutor bhejo
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 6️⃣ Yeh router export karo taki `index.js` mein use kar sakein
module.exports = router;
