const express = require('express');
const SafetyAudit = require('../models/SafetyAudit');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/audit', authenticateToken, async (req, res) => {
    const { auditDate, auditor, findings, recommendations } = req.body;

    const audit = new SafetyAudit({ auditDate, auditor, findings, recommendations });

    try {
        await audit.save();
        res.status(201).json({ message: 'Safety audit logged successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log safety audit' });
    }
});

router.get('/audits', authenticateToken, async (req, res) => {
    try {
        const audits = await SafetyAudit.find().populate('auditor', 'username');
        res.json(audits);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve safety audits' });
    }
});

module.exports = router;
