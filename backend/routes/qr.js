const express = require('express');
const QRCode = require('qrcode');
const QRData = require('../models/QRData');
const User = require('../models/userData');
const Attendance = require('../models/Attendance');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/generate', authenticateToken, async (req, res) => {
    const saltRounds = 10;
    const { userId } = req.body;
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let qrData = await QRData.findOne({
            userId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (qrData) {
            return res.json({ qrCodeData: qrData.qrCode });
        }

        const uniqueToken = `${userId}-${Date.now()}`;
        const hashedToken = await bcrypt.hash(uniqueToken, saltRounds);
        const qrCodeData = await QRCode.toDataURL(hashedToken);

        qrData = new QRData({
            userId,
            date: Date.now(),
            qrCode: qrCodeData,
            qrToken: hashedToken,
            checkedIn: false
        });
        await qrData.save();
        res.json({ qrCodeData });
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

router.post('/verify', authenticateToken, async (req, res) => {
    const { decodedToken } = req.body;

    try {
        const qrData = await QRData.findOne({ qrToken: decodedToken });
        if (!qrData) {
            return res.status(404).json({ error: 'Invalid QR code' });
        }

        if (!qrData.checkedIn) {
            qrData.checkedIn = true;
            await qrData.save();

            const attendanceDate = new Date(qrData.date);
            const month = attendanceDate.getMonth() + 1;
            const year = attendanceDate.getFullYear();
            const attendance = new Attendance({
                userId: qrData.userId,
                date: qrData.date,
                marked: false,   
                month,
                year
            });

            await attendance.save();
            res.json({ message: 'Check-in successful' });
        } else {
            const attendance = await Attendance.findOne({
                userId: qrData.userId,
                date: qrData.date
            });

            if (attendance) {
                attendance.marked = true;
                await attendance.save();
            }

            await QRData.findByIdAndDelete(qrData._id);
            res.json({ message: 'Check-out successful, QR code invalidated' });
        }
    } catch (err) {
        console.error('Error verifying QR code:', err);
        res.status(500).json({ error: 'Failed to verify QR code' });
    }
});

module.exports = router;
