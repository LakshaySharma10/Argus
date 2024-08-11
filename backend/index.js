const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const attendanceRoutes = require('./routes/attendance');
const auditRoutes = require('./routes/audit');
const emergencyRoutes = require('./routes/emergencycontact');
const equipmentRoutes = require('./routes/equipments');
const safetyIncidencesRoutes = require('./routes/safetyincidents');
const firstAidRoutes = require('./routes/firstaidstock');
const leaveRoutes = require('./routes/leaves');
const workingConditionsRoutes = require('./routes/workingConditions');
const chatbotRoutes = require('./routes/chatbot');
require('dotenv').config();

connection()
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/qr', qrRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/audit', auditRoutes);
app.use('/emergency', emergencyRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/safetyincidents', safetyIncidencesRoutes);
app.use('/firstaid', firstAidRoutes);
app.use('/leave', leaveRoutes);
app.use('/workingconditions', workingConditionsRoutes);
app.use('/chatbot', chatbotRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
