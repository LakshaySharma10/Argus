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

router.get('/:userId/summary', async (req, res) => {
    const { userId } = req.params;
    try {
        const attendanceRecords = await Attendance.find({ userId });

        let totalWorkingDays = 0;
        let totalDaysPresent = 0;
        let monthlyAttendance = {};

        attendanceRecords.forEach(record => {
            totalWorkingDays++;
            if (record.marked) {
                totalDaysPresent++;
            }

            const monthYear = `${record.month}-${record.year}`;
            if (!monthlyAttendance[monthYear]) {
                monthlyAttendance[monthYear] = { workingDays: 0, daysPresent: 0 };
            }
            monthlyAttendance[monthYear].workingDays++;
            if (record.marked) {
                monthlyAttendance[monthYear].daysPresent++;
            }
        });

        res.json({
            totalWorkingDays,
            totalDaysPresent,
            monthlyAttendance
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve attendance summary' });
    }
});

module.exports = router;
