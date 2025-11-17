const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: String,
  phone: String,
  dateTime: { type: Date, required: true },
  guests: { type: Number, default: 2 },
  status: { type: String, enum: ['upcoming','completed','cancelled'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
