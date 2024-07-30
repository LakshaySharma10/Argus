const mongoose = require('mongoose');

const QRDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    qrCode: { type: String, required: true },
    qrToken: { type: String, required: true },
    checkedIn: { type: Boolean, default: false } // New field to track check-in status
});

module.exports = mongoose.model('QRData', QRDataSchema);
