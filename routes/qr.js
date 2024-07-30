const express = require('express');
const QRCode = require('qrcode');
const QRData = require('../models/QRData');
const User = require('../models/userData');
const Attendance = require('../models/Attendance');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function authenticateToken(req, res, next) {
    const secret = process.env.JWT_SECRET;
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

router.post('/generate', authenticateToken, async (req, res) => {
    const saltRounds = 10;
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const uniqueToken = `${userId}-${Date.now()}`;
        const hashedToken = await bcrypt.hash(uniqueToken, saltRounds);
        const qrCodeData = await QRCode.toDataURL(hashedToken);

        const qrData = new QRData({
            userId,
            date: Date.now(),
            qrCode: qrCodeData,
            qrToken: hashedToken,
            checkedIn: false // Set checkedIn to false initially
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

            const attendance = new Attendance({
                userId: qrData.userId,
                date: qrData.date,
                marked: true
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
