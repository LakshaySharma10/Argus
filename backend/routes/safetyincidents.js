const express = require('express');
const SafetyIncident = require('../models/SafetyIncidents');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/incident', authenticateToken, async (req, res) => {
    const { userId, description } = req.body;

    const incident = new SafetyIncident({ userId, description });

    try {
        await incident.save();
        res.status(201).json({ message: 'Safety incident logged successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log safety incident' });
    }
});

router.get('/incidents', authenticateToken, async (req, res) => {
    try {
        const incidents = await SafetyIncident.find().populate('userId', 'username');
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve safety incidents' });
    }
});

module.exports = router;
