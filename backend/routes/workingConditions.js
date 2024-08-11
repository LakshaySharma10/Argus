const express = require('express');
const router = express.Router();
const WorkingCondition = require('../models/WorkingConditions');

router.post('/', async (req, res) => {
    try {
      const { temperature, amenities, breaks, otherConditions } = req.body;
      
      const currentDate = new Date();
  
      const workingCondition = new WorkingCondition({
        date: currentDate, 
        temperature,
        amenities,
        breaks,
        otherConditions
      });
  
      await workingCondition.save();
    res.status(200).json({ message: 'Working condition added successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
  

router.get('/', async (req, res) => {
    try {
      const workingConditions = await WorkingCondition.find().sort({ date: -1 });
      res.json(workingConditions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  

module.exports = router;
