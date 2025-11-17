require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../config/db');
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const Visit = require('../models/Visit');

// City coordinates for 5 major cities
const cities = {
  'New York': { lat: 40.7128, lng: -74.0060 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Sydney': { lat: -33.8688, lng: 151.2093 }
};

(async () => {
  try {
    db();
    await Restaurant.deleteMany({});
    await Reservation.deleteMany({});
    await Visit.deleteMany({});

    // Restaurant data with auto-generated coordinates
    const restaurantsData = [
      // New York
      { name: 'Basil & Berry', address: '12 Main St', city: 'New York', cuisine: 'Italian', description: 'Cozy neighborhood spot with craft pasta.', image: 'https://images.unsplash.com/photo-1528655129195-9f0b79f6a9c9?auto=format&fit=crop&w=800&q=60' },
      { name: 'The Burger Hub', address: '45 5th Ave', city: 'New York', cuisine: 'American', description: 'Juicy burgers and hand-cut fries.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60' },
      { name: 'Sakura Sushi', address: '78 Park Ave', city: 'New York', cuisine: 'Japanese', description: 'Fresh sushi and traditional rolls.', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=60' },

      // London
      { name: 'The Fish House', address: '23 Oxford St', city: 'London', cuisine: 'British', description: 'Classic fish and chips done right.', image: 'https://images.unsplash.com/photo-1517248135467-4d71bcdd2167?auto=format&fit=crop&w=800&q=60' },
      { name: 'Curry Palace', address: '67 Brick Lane', city: 'London', cuisine: 'Indian', description: 'Authentic Indian spices and flavors.', image: 'https://images.unsplash.com/photo-1585937421612-70a19fb6930b?auto=format&fit=crop&w=800&q=60' },
      { name: 'Thai Corner', address: '34 Soho Rd', city: 'London', cuisine: 'Thai', description: 'Vibrant Thai cuisine with fresh herbs.', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1ab012?auto=format&fit=crop&w=800&q=60' },

      // Paris
      { name: 'Le Petit Bistro', address: '12 Rue de Rivoli', city: 'Paris', cuisine: 'French', description: 'Classic French cuisine in cozy setting.', image: 'https://images.unsplash.com/photo-1498895714122-54ce3f3e89d2?auto=format&fit=crop&w=800&q=60' },
      { name: 'Pizzeria Roma', address: '56 Boulevard St-Germain', city: 'Paris', cuisine: 'Italian', description: 'Wood-fired pizzas and fresh pasta.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=60' },
      { name: 'Seoul Kitchen', address: '89 Rue de la Paix', city: 'Paris', cuisine: 'Korean', description: 'Bold Korean flavors and street food.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60' },

      // Tokyo
      { name: 'Ramen Ya', address: '45 Shibuya Ward', city: 'Tokyo', cuisine: 'Japanese', description: 'Perfect ramen bowls and tonkotsu broth.', image: 'https://images.unsplash.com/photo-1622465066905-eb86e1f1c17d?auto=format&fit=crop&w=800&q=60' },
      { name: 'Izakaya Hana', address: '23 Minato Ward', city: 'Tokyo', cuisine: 'Japanese', description: 'Traditional izakaya with sake selection.', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=60' },
      { name: 'Saffron Spoon', address: '55 Chiyoda Ward', city: 'Tokyo', cuisine: 'Indian', description: 'Homestyle curries and breads.', image: 'https://images.unsplash.com/photo-1604908175896-a6cefadc4c8f?auto=format&fit=crop&w=800&q=60' },

      // Sydney
      { name: 'Opera Cafe', address: '12 Martin Place', city: 'Sydney', cuisine: 'Australian', description: 'Modern Australian cuisine with fresh seafood.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60' },
      { name: 'Neon Noodles', address: '101 King St', city: 'Sydney', cuisine: 'Asian Fusion', description: 'Bold flavors and shareable plates.', image: 'https://images.unsplash.com/photo-1571091718767-18f9c5b42f49?auto=format&fit=crop&w=800&q=60' },
      { name: 'Bondi Beach Grill', address: '78 Bondi Rd', city: 'Sydney', cuisine: 'Seafood', description: 'Fresh catch and ocean views.', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=60' }
    ];

    const restaurants = [];

    // Create restaurants with auto-generated coordinates within each city
    for (const restaurantData of restaurantsData) {
      const cityCoords = cities[restaurantData.city];
      // Add slight variation to coordinates so they appear near the city center
      const latitude = cityCoords.lat + (Math.random() - 0.5) * 0.05;
      const longitude = cityCoords.lng + (Math.random() - 0.5) * 0.05;

      const restaurant = await Restaurant.create({
        ...restaurantData,
        latitude,
        longitude
      });
      restaurants.push(restaurant);
    }

    // Create some reservations
    await Reservation.create({ restaurant: restaurants[0]._id, name: 'Alice', phone: '555-0101', dateTime: new Date(Date.now() + 1000 * 60 * 60 * 24), guests: 2 });
    await Reservation.create({ restaurant: restaurants[1]._id, name: 'Bob', phone: '555-0202', dateTime: new Date(Date.now() + 1000 * 60 * 60 * 48), guests: 4 });

    // Create visits (mark some restaurants as visited)
    await Visit.create({ restaurant: restaurants[0]._id, visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), rating: 5, comment: 'Amazing pasta!' });
    await Visit.create({ restaurant: restaurants[1]._id, visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), rating: 4, comment: 'Best burgers in town' });
    await Visit.create({ restaurant: restaurants[3]._id, visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), rating: 5, comment: 'Classic fish and chips!' });
    await Visit.create({ restaurant: restaurants[6]._id, visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), rating: 4, comment: 'Lovely French bistro' });
    await Visit.create({ restaurant: restaurants[9]._id, visitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), rating: 5, comment: 'Perfect ramen!' });

    console.log('Seed data created');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
