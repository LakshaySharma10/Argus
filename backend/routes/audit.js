const express = require('express');
const SafetyAudit = require('../models/SafetyAudits');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/audit', async (req, res) => {
    const { auditDate, auditor, findings, recommendations } = req.body;

    const audit = new SafetyAudit({ auditDate, auditor, findings, recommendations });

    try {
        await audit.save();
        res.status(201).json({ message: 'Safety audit logged successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log safety audit' });
    }
});

router.get('/audits', async (req, res) => {
    try {
        const audits = await SafetyAudit.find();
        res.json(audits);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve safety audits' });
    }
});

module.exports = router;
