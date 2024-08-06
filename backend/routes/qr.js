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
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const uniqueToken = `${email}-${Date.now()}`;
        const hashedToken = await bcrypt.hash(uniqueToken, saltRounds);
        const qrCodeData = await QRCode.toDataURL(hashedToken);

        const qrData = new QRData({
            email,
            date: Date.now(),
            qrCode: qrCodeData,
            qrToken: hashedToken,
            checkedIn: false
        });
        await qrData.save();
        res.json({ qrCodeData });
    } catch (err) {
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
                marked: true,   
                month,
                year
            });

            await attendance.save();
            res.json({ message: 'Check-in successful' });
        } else {
            await QRData.findByIdAndDelete(qrData._id);
            res.json({ message: 'Check-out successful, QR code invalidated' });
        }
    } catch (err) {
        console.error('Error verifying QR code:', err);
        res.status(500).json({ error: 'Failed to verify QR code' });
    }
});

module.exports = router;
