const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const attendanceRecords = await Attendance.find({ userId });
        res.json(attendanceRecords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve attendance records' });
    }
});

module.exports = router;
