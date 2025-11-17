const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

module.exports = {
  create: async (req, res) => {
    const { restaurantId, name, phone, dateTime, guests } = req.body;
    const reservation = new Reservation({ restaurant: restaurantId, name, phone, dateTime, guests });
    await reservation.save();
    res.redirect('/dashboard');
  },
  list: async (req, res) => {
    const reservations = await Reservation.find().populate('restaurant');
    res.json(reservations);
  },
  markVisited: async (req, res) => {
    const resv = await Reservation.findByIdAndUpdate(req.params.id, { status: 'completed' });
    // create a Visit record for the reservation
    const Visit = require('../models/Visit');
    await Visit.create({ restaurant: resv.restaurant, reservation: resv._id, visitedAt: new Date() });
    res.redirect('/dashboard');
  },
  cancel: async (req, res) => {
    await Reservation.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.redirect('/dashboard');
  },
  delete: async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  }
};