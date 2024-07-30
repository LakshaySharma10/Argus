const express = require('express');
const FirstAidKit = require('../models/FirstAidKit');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/stock', authenticateToken, async (req, res) => {
    const { itemName, quantity } = req.body;

    try {
        let item = await FirstAidKit.findOne({ itemName });
        if (item) {
            item.quantity = quantity;
            item.updatedAt = Date.now();
        } else {
            item = new FirstAidKit({ itemName, quantity });
        }
        await item.save();
        res.status(201).json({ message: 'First aid kit stock updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update first aid kit stock' });
    }
});

router.get('/stock', authenticateToken, async (req, res) => {
    try {
        const stock = await FirstAidKit.find();
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve first aid kit stock' });
    }
});

module.exports = router;
