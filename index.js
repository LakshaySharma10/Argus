const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const attendanceRoutes = require('./routes/attendance');
require('dotenv').config();

connection()
const app = express();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/qr', qrRoutes);
app.use('/attendance', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
