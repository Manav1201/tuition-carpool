const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
  },
  studentName: String,
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
  },
  pickupLocation: String,
  dropLocation: String,
  time: String,
});

module.exports = mongoose.model('Ride', rideSchema);
