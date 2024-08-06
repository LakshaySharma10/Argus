const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userData');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const saltRounds = 10
    const { username, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const user = new User({ username, email, passwordHash });

    try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.post('/login', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '12h' });
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to log in' });
    }
});

router.get('/profile', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});

module.exports = router;
