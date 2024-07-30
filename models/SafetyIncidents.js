const mongoose = require('mongoose');

const SafetyIncidentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SafetyIncident', SafetyIncidentSchema);
