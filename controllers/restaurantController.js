const Restaurant = require('../models/Restaurant');

module.exports = {
  index: async (req, res) => {
    const q = req.query.q || '';
    const filter = q ? { $or: [{ name: new RegExp(q,'i') }, { cuisine: new RegExp(q,'i') }, { address: new RegExp(q,'i') }] } : {};
    const restaurants = await Restaurant.find(filter).sort('-avgRating').limit(50);
    res.render('find', { restaurants, q });
  },
  newForm: (req, res) => {
    res.render('restaurants/new');
  },
  create: async (req, res) => {
    const { name, address, city, cuisine, description, image, latitude, longitude } = req.body;
    const rest = new Restaurant({ name, address, city, cuisine, description, image, latitude, longitude });
    await rest.save();
    res.redirect('/restaurants/find');
  },
  show: async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.redirect('/restaurants/find');
    res.render('restaurants/show', { restaurant });
  },
  editForm: async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render('restaurants/edit', { restaurant });
  },
  update: async (req, res) => {
    const { name, address, city, cuisine, description, image, latitude, longitude } = req.body;
    await Restaurant.findByIdAndUpdate(req.params.id, { name, address, city, cuisine, description, image, latitude, longitude });
    res.redirect(`/restaurants/${req.params.id}`);
  },
  delete: async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.redirect('/restaurants/find');
  },
  rate: async (req, res) => {
    const { username, score, comment } = req.body;
    const r = await Restaurant.findById(req.params.id);
    r.ratings.push({ username: username || 'Guest', score: Number(score), comment });
    const sum = r.ratings.reduce((acc, it) => acc + it.score, 0);
    r.avgRating = +(sum / r.ratings.length).toFixed(1);
    await r.save();
    // redirect back to where the request came from so ratings work both from cards and show
    const redirectTo = req.get('referer') || `/restaurants/${req.params.id}`;
    res.redirect(redirectTo);
  }
};