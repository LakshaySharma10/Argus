const express = require('express');
const SafetyIncident = require('../models/SafetyIncidents');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/incident', authenticateToken, async (req, res) => {
    const { incidentDate, description, usersInvolved } = req.body;

    const incident = new SafetyIncident({ incidentDate, description, usersInvolved });

    try {
        await incident.save();
        res.status(201).json({ message: 'Safety incident logged successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log safety incident' });
    }
});

router.get('/incidents', authenticateToken, async (req, res) => {
    try {
        const incidents = await SafetyIncident.find();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve safety incidents' });
    }
});

module.exports = router;
