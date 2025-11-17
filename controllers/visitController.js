const Visit = require('../models/Visit');
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

module.exports = {
  create: async (req, res) => {
    try {
      const { restaurantId, reservationId, visitedAt, rating, comment, username } = req.body;
      const visit = new Visit({
        restaurant: restaurantId,
        reservation: reservationId || null,
        visitedAt: visitedAt ? new Date(visitedAt) : new Date(),
        rating: rating ? Number(rating) : undefined,
        comment
      });
      await visit.save();

      // if rating was provided, push to restaurant ratings and recompute avg
      if (rating) {
        const r = await Restaurant.findById(restaurantId);
        r.ratings.push({ username: username || 'Guest', score: Number(rating), comment });
        const sum = r.ratings.reduce((acc, it) => acc + it.score, 0);
        r.avgRating = +(sum / r.ratings.length).toFixed(1);
        await r.save();
      }

      // if a reservationId was supplied, mark reservation as completed
      if (reservationId) {
        await Reservation.findByIdAndUpdate(reservationId, { status: 'completed' });
      }

      res.redirect('/dashboard');
    } catch (err) {
      console.error('Failed to create visit', err);
      res.redirect('/dashboard');
    }
  }
};