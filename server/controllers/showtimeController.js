const mongoose = require('mongoose');
const Showtime = require('../models/Showtime');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie'); 

const CLEANUP_MINUTES = 15; 

const getShowtimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    const showtime = await Showtime.findById(id);
    if (!showtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
    }

    const room = await Room.findById(showtime.roomId);
    const bookedSeats = await Booking.getBookedSeats(id); // chỉ tính vé 'paid'

    res.status(200).json({ showtime, room, bookedSeats });
  } catch (err) {
    next(err);
  }
};

const createShowtime = async (req, res, next) => {
  try {
    const { movieId, roomId, startTime } = req.body;
    const price = Number(req.body.price);
    const vipPrice = Number(req.body.vipPrice);

    if (!mongoose.isValidObjectId(movieId) || !mongoose.isValidObjectId(roomId)) {
      return res.status(400).json({ message: 'movieId hoặc roomId không hợp lệ' });
    }
    const start = new Date(startTime);
    if (!startTime || Number.isNaN(start.getTime())) {
      return res.status(400).json({ message: 'Giờ bắt đầu (startTime) không hợp lệ' });
    }
    if (!Number.isFinite(price) || price < 0 || !Number.isFinite(vipPrice) || vipPrice < 0) {
      return res.status(400).json({ message: 'Giá vé phải là số không âm' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Không tìm thấy phim' });
    }
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng chiếu' });
    }

    const end = new Date(start.getTime() + (movie.duration + CLEANUP_MINUTES) * 60000);

    const overlap = await Showtime.findOne({
      roomId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });
    if (overlap) {
      return res.status(400).json({ message: 'Phòng chiếu bị trùng lịch' });
    }

    const showtime = await Showtime.create({
      movieId,
      roomId,
      startTime: start,
      endTime: end,
      price,
      vipPrice,
    });
    res.status(201).json(showtime);
  } catch (err) {
    next(err);
  }
};

module.exports = { getShowtimeById, createShowtime };
