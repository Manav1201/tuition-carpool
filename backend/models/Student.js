const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: String,
  parentName: String,
  contact: String,
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch', // jab Batch model banega
  },
});

module.exports = mongoose.model('Student', studentSchema);
