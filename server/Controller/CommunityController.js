const express = require('express');
const Community = require('../Model/CommunityModel');
const router = express.Router();
// const upload = require('../multer')
const multer = require('multer');
const ErrorHandler = require('../Utils/ErrorHandler');
const { upload } = require('../multer');


router.post('/create-community', upload.single('communityImage'), async (req, res) => {
    try {
        // Extract data from the request body
        const { name, city, state, zipCode } = req.body;


        const existVendor = await Community.findOne({ name });
        if (existVendor) {
            return res.status(400).json({ message: 'Community already exists' });
        }


        const fileUrl = req.file.filename;


        // Create a new Vendor instance
        const community = new Community({
            name,
            city,
            state,
            zipCode,
            communityImage: fileUrl,
        });

        // Save the vendor data to the database
        const savedVendor = await community.save();
console.log(savedVendor)
        res.status(201).json({ message: 'community created successfully', savedVendor });
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


module.exports = router;