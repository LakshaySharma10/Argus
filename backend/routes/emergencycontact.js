const express = require('express');
const EmergencyContact = require('../models/EmergencyContact');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/contact', authenticateToken, async (req, res) => {
    const { userId, name, relation, phone, email } = req.body;

    try {
        const existingContact = await EmergencyContact.findOne({ userId });

        if (existingContact) {
            await EmergencyContact.deleteOne({ userId });
        }

        const contact = new EmergencyContact({ userId, name, relation, phone, email });
        await contact.save();

        res.status(201).json({ message: 'Emergency contact added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add emergency contact' });
    }
});

router.get('/contacts/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const contacts = await EmergencyContact.find({ userId });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve emergency contacts' });
    }
});

module.exports = router;
