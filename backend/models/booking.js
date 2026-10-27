const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  eventId: {
    type: String,
    required: true,
    index: true
  },
  attendeeName: {
    type: String,
    required: [true, "Attendee name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "Seats must be an integer"
    }
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model("Booking", bookingSchema);
