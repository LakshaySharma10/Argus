const mongoose = require('mongoose');

const SafetyAuditSchema = new mongoose.Schema({
    auditDate: { type: Date, required: true },
    auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    findings: { type: String, required: true },
    recommendations: { type: String, required: true }
});

module.exports = mongoose.model('SafetyAudit', SafetyAuditSchema);
