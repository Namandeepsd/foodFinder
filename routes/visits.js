const express = require('express');
const router = express.Router();
const VisitController = require('../controllers/visitController');

router.post('/', VisitController.create);

module.exports = router;