require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// connect DB
const db = require('./config/db');
db();

// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Pass req to all views
app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

// routes
const indexRoutes = require('./routes/index');
const restaurantRoutes = require('./routes/restaurants');
const reservationRoutes = require('./routes/reservations');
const visitRoutes = require('./routes/visits');

app.use('/', indexRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/reservations', reservationRoutes);
app.use('/visits', visitRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
