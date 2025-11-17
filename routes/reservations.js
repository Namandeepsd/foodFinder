const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

router.post('/', ReservationController.create);
router.post('/:id/visit', ReservationController.markVisited);
router.post('/:id/cancel', ReservationController.cancel);
router.delete('/:id', ReservationController.delete);

module.exports = router;