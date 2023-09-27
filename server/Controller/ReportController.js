const express = require('express');
const Report = require('../Model/ReportModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const router = express.Router();
const sendToken = require('../Utils/jwtToken');
const { isAuthenticated } = require('../Middleware/auth');
// const { upload } = require('../multer');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');
const { upload } = require('../multer');



// API for creating users
router.post('/create-report', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), async (req, res, next) => {
    try {
      const { reportTitle, user, reportDiscription ,community} = req.body;
      
      let image1Url = '';
      let image2Url = '';
      let image3Url = '';
  
      // Check if corresponding files exist in req.files and set the URLs if available
      if (req.files['image1'] && req.files['image1'][0]) {
        image1Url = req.files['image1'][0].filename;
      }
  
      if (req.files['image2'] && req.files['image2'][0]) {
        image2Url = req.files['image2'][0].filename;
      }
  
      if (req.files['image3'] && req.files['image3'][0]) {
        image3Url = req.files['image3'][0].filename;
      }

      const report = new Report({
        reportTitle,
        user, 
        reportDiscription,
        community,
        image1: image1Url,
        image2: image2Url,
        image3: image3Url,
      });
  
      // Save the report data to the database
      await report.save();
  
      res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(error.message, 500));
    }
  });



  // get all users
  router.get('/getAllReports', async (req, res, next) => {
    try {
      const reports = await Report.find().populate('user').sort({ createdAt: -1 });
      res.status(200).json({ success: true, reports });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  
  //fetch a user by its id
  router.get('/getReport/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await Report.findById(id).populate('user');
  
      res.status(200).json({ report });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  router.put('/updateStatus/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateUser = req.body;
      // Update the quiz in the database
      const report = await Report.findByIdAndUpdate(id, updateUser, { new: true });
  
      res.status(200).json({ report });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update report' });
    }
  });


  router.post('/add-feedback/:reportId', async (req, res, next) => {
    try {
      const reportId = req.params.reportId;
      const { userId, feedback } = req.body;
  
      // Find the report by its ID
      
      const report = await Report.findById(reportId);
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      // Create a new feedback object
      const newFeedback = {
        userId,
        feedback,
      };
  
      // Add the feedback to the report's feedback array
      report.feedback.push(newFeedback);
  
      // Save the updated report
      await report.save();
  
      res.status(201).json({ message: 'Feedback added successfully', feedback: newFeedback });
    } catch (error) {
      return next(error);
    }
  });

// Delete a community by ID
router.delete('/deleteReport/:reportId', async (req, res, next) => {
  try {
    const { reportId } = req.params;

    // Find the community by its ID and remove it
    const deletedCommunity = await Report.findByIdAndRemove(reportId);

    if (!deletedCommunity) {
      // If the community with the specified ID was not found, return a 404 Not Found response
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    // Handle any errors and pass them to the error handler middleware
    return next(new ErrorHandler(error.message, 500));
  }
});


  
module.exports = router;