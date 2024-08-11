const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workingConditionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  temperature: {
    type: Number,
    required: true
  },
  amenities: {
    type: String,
    required: false
  },
  breaks: {
    type: String,
    required: false
  },
  otherConditions: {
    type: String,
    required: false
  },
});

const WorkingCondition = mongoose.model('WorkingCondition', workingConditionSchema);

module.exports = WorkingCondition;
