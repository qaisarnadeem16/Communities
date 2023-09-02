const express = require('express');
const Vendor = require('../Model/VendorModel');
const router = express.Router();
// const upload = require('../multer')
const multer = require('multer');
const ErrorHandler = require('../Utils/ErrorHandler');
const { upload } = require('../multer');
const {  isVendorAuthenticated } = require('../Middleware/auth');
const sendVendorToken=require('../Utils/jwtVendorToken')


router.post('/create-Vendor', upload.single('logo'), async (req, res) => {
    try {
        // Extract data from the request body
        const { vendorName, headOffice, branch, number, email, password } = req.body;


        const existVendor = await Vendor.findOne({ email });
        if (existVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }


        const fileUrl = req.file.filename;


        // Create a new Vendor instance
        const vendor = new Vendor({
            vendorName,
            headOffice,
            branch,
            number,
            email,
            password,
            logo: fileUrl,
        });

        // Save the vendor data to the database
        const savedVendor = await vendor.save();

        res.status(201).json({ message: 'Vendor created successfully', savedVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save Vendor' });
    }
});


//login the vendor
router.post('/login-vendor', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email }).select("+password");

    if (!vendor) {
      return res.status(400).json({message: "vendor doesn't exist!"});
    }

   
    const isPasswordValid = await vendor.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Please provide Correct Password' });

    }

     sendVendorToken(vendor, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// getvendorToken
router.get("/getVendor", isVendorAuthenticated, async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.user.id }); // Update the parameter to be an object with the filter criteria

    if (!vendor) {
      return next(new ErrorHandler("vendor doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      vendor,
    });
// console.log(user)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



//call all vendors
router.get('/getAllVendors', async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ _id: -1 });
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
});



  
  //fetch a user by its id
  router.get('/getVendor/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const vendor = await Vendor.findById(id);
  
      res.status(200).json({ vendor });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  // Update user data
  router.put('/updateVendor/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const updateUser = req.body;
      console.log(updateUser)
      // Update the quiz in the database
      const vendor = await Vendor.findByIdAndUpdate(id, updateUser, { new: true });
  
      res.status(200).json({ vendor });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update quiz' });
    }
  });
  
  
  // delete user
  router.delete('/deleteVendor/:userId', async (req, res, next) => {
    const userId = req.params.userId;
  
    try {
      const user = await Vendor.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      // Delete the user using deleteOne method on the model
      await Vendor.deleteOne({ _id: userId });
  
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  });



//logout
  router.get('/logout'  , async(req, res, next)=>{
    try {
      res.clearCookie('vendorToken');
  
      res.status(201).json({
        success: true,
        message:" log out successfully"
      })
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })




module.exports = router;
