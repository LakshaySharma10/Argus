const express = require('express');
const EquipmentMaintenance = require('../models/EquipmentMaintenance');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/maintenance', authenticateToken, async (req, res) => {
    const { equipmentId, maintenanceDate, description, performedBy } = req.body;

    const maintenance = new EquipmentMaintenance({ equipmentId, maintenanceDate, description, performedBy });

    try {
        await maintenance.save();
        res.status(201).json({ message: 'Maintenance record logged successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log maintenance record' });
    }
});

router.get('/maintenances', authenticateToken, async (req, res) => {
    try {
        const maintenances = await EquipmentMaintenance.find().populate('performedBy', 'username');
        res.json(maintenances);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve maintenance records' });
    }
});

module.exports = router;
