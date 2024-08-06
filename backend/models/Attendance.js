const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    marked: { type: Boolean, default: false },
    month: { type: Number, required: true },
    year: { type: Number, required: true }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
