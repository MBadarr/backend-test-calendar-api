// src/routes/holidayRoutes.js
const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.get('/holidays', calendarController.getHolidays);
router.get('/countries', calendarController.getCountries);

module.exports = router;