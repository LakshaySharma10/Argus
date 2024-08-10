const mongoose = require('mongoose');

const SafetyIncidentSchema = new mongoose.Schema({
    incidentDate: { type: Date, required: true },
    description: { type: String, required: true },
    usersInvolved: { type: Array, required: true },
});

module.exports = mongoose.model('SafetyIncident', SafetyIncidentSchema);
