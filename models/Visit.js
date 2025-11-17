const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
  visitedAt: { type: Date, default: Date.now },
  rating: { type: Number, min:1, max:5 },
  comment: String
});

module.exports = mongoose.model('Visit', VisitSchema);
