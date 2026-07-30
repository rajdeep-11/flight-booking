const express = require('express');

const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes')

const router = express.Router();

console.log("Inside v1 routes");

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes)

module.exports = router;