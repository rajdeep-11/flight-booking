const express = require('express');

const airplaneRoutes = require('./airplane-routes');

const router = express.Router();

console.log("Inside v1 routes");

router.use('/airplanes', airplaneRoutes);

module.exports = router;