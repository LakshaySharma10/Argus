const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['Sick', 'Casual', 'Earned', 'Unpaid']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected']
    },
    appliedOn: {
        type: Date,
        default: Date.now
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
