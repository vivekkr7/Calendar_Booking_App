const { v4: uuidv4 } = require('uuid');
const bookings = require('../models/bookings');

let isBookingLocked = false;

// GET /bookings
exports.getAllBookings = (req, res) => {
  res.json(bookings);
};

// GET /bookings/:id
exports.getBookingById = (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
};

// POST /bookings
exports.createBooking = (req, res) => {
  const { userId, startTime, endTime } = req.body;

  if (!userId || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  // Concurrency lock check
  if (isBookingLocked) {
    return res.status(429).json({ error: 'Booking system is busy. Try again.' });
  }

  isBookingLocked = true;
  try {
    const conflict = bookings.some(booking =>
      new Date(booking.startTime) < end && new Date(booking.endTime) > start
    );

    if (conflict) {
      return res.status(409).json({ error: 'Booking time conflicts with existing booking' });
    }

    const newBooking = {
      id: uuidv4(),
      userId,
      startTime,
      endTime
    };

    bookings.push(newBooking);
    res.status(201).json(newBooking);
  } finally {
    isBookingLocked = false;
  }
};

// PUT /bookings/:id
exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const { userId, startTime, endTime } = req.body;

  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  const conflict = bookings.some(b =>
    b.id !== id &&
    new Date(b.startTime) < end &&
    new Date(b.endTime) > start
  );

  if (conflict) {
    return res.status(409).json({ error: 'Booking time conflicts with existing booking' });
  }

  bookings[index] = { id, userId, startTime, endTime };
  res.json(bookings[index]);
};

// DELETE /bookings/:id
exports.deleteBooking = (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const deleted = bookings.splice(index, 1)[0];
  res.json({ message: 'Booking deleted', booking: deleted });
};
