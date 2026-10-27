const Event = require('../models/event');
const Booking = require('../models/booking');

// Get all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, availableSeats } = req.body;
    
    const newEvent = new Event({ title, description, date, availableSeats });
    await newEvent.save();
    
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

// Book tickets for an event
exports.bookEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userName, ticketsBooked } = req.body;

    // 1. Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // 2. Check seat availability
    if (event.availableSeats < ticketsBooked) {
      return res.status(400).json({ message: 'Not enough available seats left' });
    }

    // 3. Deduct seats and save the event updates
    event.availableSeats -= ticketsBooked;
    await event.save();

    // 4. Record the booking log
    const booking = new Booking({ eventId, userName, ticketsBooked });
    await booking.save();

    res.status(201).json({ message: 'Booking successful!', event, booking });
  } catch (error) {
    next(error);
  }
};