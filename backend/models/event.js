const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    trim: true
  },
  venue: {
    type: String,
    required: [true, "Venue is required"],
    trim: true
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
  },
  totalSeats: {
    type: Number,
    required: true,
    min: [1, "Total seats must be at least 1"],
    max: [500, "Total seats cannot exceed 500"],
    validate: {
      validator: Number.isInteger,
      message: "Total seats must be an integer"
    }
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model("Event", eventSchema);
