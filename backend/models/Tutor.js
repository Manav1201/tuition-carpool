const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  subject: String
});

module.exports = mongoose.model('Tutor', tutorSchema);
