const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming Tutor is also in 'User' model
    required: true,
  },
  tutorName: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming Parent is in 'User' model
  },
  joinCode: {
    type: String,
    required: true,
    unique: true,   // 🚨 each batch code must be unique
  }
});

module.exports = mongoose.model('Batch', batchSchema);
