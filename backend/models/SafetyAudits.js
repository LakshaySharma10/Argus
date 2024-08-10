const mongoose = require('mongoose');

const SafetyAuditSchema = new mongoose.Schema({
    auditDate: { type: Date, required: true },
    auditor: { type: String, required: true},
    findings: { type: Array, required: true },
    recommendations: { type: Array, required: true }
});

module.exports = mongoose.model('SafetyAudit', SafetyAuditSchema);
