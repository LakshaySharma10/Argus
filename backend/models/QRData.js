const mongoose = require('mongoose');

const QRDataSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, default: Date.now },
    qrCode: { type: String, required: true },
    qrToken: { type: String, required: true },
    checkedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model('QRData', QRDataSchema);
