const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

router.get('/find', RestaurantController.index);
router.get('/new', RestaurantController.newForm);
router.post('/', RestaurantController.create);
router.get('/:id', RestaurantController.show);
router.get('/:id/edit', RestaurantController.editForm);
router.put('/:id', RestaurantController.update);
router.delete('/:id', RestaurantController.delete);
router.post('/:id/rate', RestaurantController.rate);

module.exports = router;