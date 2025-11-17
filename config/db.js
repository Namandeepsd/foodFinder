const mongoose = require('mongoose');

module.exports = function () {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/foodfinder';
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', (err) => console.error('MongoDB connection error:', err));
  db.once('open', () => console.log('MongoDB connected'));
};
