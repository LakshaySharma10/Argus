const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const attendanceRoutes = require('./routes/attendance');
const auditRoutes = require('./routes/audit');
const emergencyRoutes = require('./routes/emergencycontact');
const equipmentRoutes = require('./routes/equipments');
const safetyIncidencesRoutes = require('./routes/safetyincidents');
const firstAidRoutes = require('./routes/firstaidstock');
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
