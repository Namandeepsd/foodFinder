const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  username: { type: String, required: false, default: 'Guest' },
  score: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  cuisine: String,
  description: String,
  image: { type: String, default: '/images/placeholder.png' },
  city: { type: String, default: 'Unknown' },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  avgRating: { type: Number, default: 0 },
  ratings: [RatingSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
