const mongoose = require('mongoose');

const FirstAidKitSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FirstAidKit', FirstAidKitSchema);
