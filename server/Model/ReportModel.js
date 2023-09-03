const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  feedback: {
    type: String,
  },
});

const reportSchema = new mongoose.Schema({
  reportTitle: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  reportDiscription: {
    type: String,
  },
  
  community: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  feedback: [feedbackSchema],
  status: {
    type: String,
    enum: ['new', 'under review', 'resolved'],
    default: 'new', // Set the default status to 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
