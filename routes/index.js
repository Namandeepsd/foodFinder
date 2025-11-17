const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/restaurants/find');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/dashboard', async (req, res) => {
  const Reservation = require('../models/Reservation');
  const Restaurant = require('../models/Restaurant');
    const now = new Date();
    const upcoming = await Reservation.find({ dateTime: { $gte: now }, status: 'upcoming' }).populate('restaurant').sort('dateTime').limit(10);
  const Visit = require('../models/Visit');
  const recentVisits = await Visit.find({}).populate('restaurant').sort('-visitedAt').limit(10);
  // Get all restaurants for map display (both visited and unvisited)
  const allRestaurants = await Restaurant.find({});
  // Get visited restaurant IDs
  const visitedRestaurantIds = recentVisits.map(v => v.restaurant._id.toString());
  // Prepare restaurant list for map - separate visited from unvisited
  const mapRestaurants = allRestaurants.map(r => ({
    ...r.toObject(),
    isVisited: visitedRestaurantIds.includes(r._id.toString())
  }));
  // also send a small list of restaurants to display and book from the dashboard
  const restaurants = await Restaurant.find({}).sort('-avgRating').limit(9);
  res.render('dashboard', { upcoming, recentVisits, restaurants, mapRestaurants });
});

module.exports = router;