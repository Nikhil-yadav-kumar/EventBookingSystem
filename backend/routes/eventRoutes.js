const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const{ getAllEvents, createEvent, bookEvent } = require('../controllers/eventController');

// HTTP Methods mapped cleanly to controller functions
router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.post('/:eventId/book', eventController.bookEvent);

module.exports = router;