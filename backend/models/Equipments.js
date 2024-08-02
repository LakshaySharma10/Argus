const mongoose = require('mongoose');

const EquipmentMaintenanceSchema = new mongoose.Schema({
    equipmentId: { type: String, required: true },
    maintenanceDate: { type: Date, required: true },
    description: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('EquipmentMaintenance', EquipmentMaintenanceSchema);