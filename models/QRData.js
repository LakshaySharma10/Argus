const mongoose = require('mongoose');

const QRDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Date: { type: Date, default: Date.now },
    qrCode: { type: String, required: true },
    qrToken: { type: String, required: true }
});

module.exports = mongoose.model('QRData', QRDataSchema);
