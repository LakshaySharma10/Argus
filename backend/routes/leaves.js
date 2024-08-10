const express = require('express');
const router = express.Router();
const Leave = require('../models/Leaves')

router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.params.userId });
        if (leaves.length === 0) {
            return res.status(404).json({ message: 'No leaves found for this user' });
        }
        res.json(leaves);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const leave = new Leave({
        employeeId: req.body.employeeId,
        leaveType: req.body.leaveType,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        appliedOn: req.body.appliedOn,
        status: req.body.status
    });

    try {
        const newLeave = await leave.save();
        res.status(201).json(newLeave);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (leave == null) {
            return res.status(404).json({ message: 'Cannot find leave' });
        }

        if (req.body.status != null) {
            leave.status = req.body.status;
        }

        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (leave == null) {
            return res.status(404).json({ message: 'Cannot find leave' });
        }

        await leave.remove();
        res.json({ message: 'Leave deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
