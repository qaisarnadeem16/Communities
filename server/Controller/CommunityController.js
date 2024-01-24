const express = require('express');
const Community = require('../Model/CommunityModel');
const router = express.Router();
// const upload = require('../multer')
const multer = require('multer');
const ErrorHandler = require('../Utils/ErrorHandler');
const { upload } = require('../multer');


router.post('/create-community', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, city, state, zipCode, communityImage } = req.body;


    // const existVendor = await Community.findOne({ name });
    // if (existVendor) {
    //   return res.status(400).json({ message: 'Community already exists' });
    // }
    // Create a new Vendor instance
    const community = new Community({
      name,
      city,
      state,
      zipCode,
      communityImage    
    });

    // Save the vendor data to the database
    const Commuity = await community.save();
    console.log(Commuity)
    res.status(201).json({ message: 'community created successfully', Commuity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save commuity' });
  }
});


// get all communities
router.get('/getAllCommunity', async (req, res, next) => {
  try {
    const users = await Community.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
});


// Delete a community by ID
router.delete('/deleteCommunity/:communityId', async (req, res, next) => {
  try {
    const { communityId } = req.params;

    // Find the community by its ID and remove it
    const deletedCommunity = await Community.findByIdAndRemove(communityId);

    if (!deletedCommunity) {
      // If the community with the specified ID was not found, return a 404 Not Found response
      return res.status(404).json({ success: false, message: 'Community not found' });
    }

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Community deleted successfully' });
  } catch (error) {
    // Handle any errors and pass them to the error handler middleware
    return next(new ErrorHandler(error.message, 500));
  }
});




module.exports = router;