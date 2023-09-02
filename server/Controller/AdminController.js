const express = require('express');
const User = require('../Model/AdminModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const router = express.Router();
const {  isAdminAuthenticated } = require('../Middleware/auth');
const { upload } = require('../multer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const sendAdminToken = require('../Utils/jwtAdminToken');




// API for creating admin
router.post('/create-admin', async (req, res, next) => {
  try {
    const { email, password } = req.body; // Extract email and password from req.body
   
    const user = new User({
      email,
      password
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error in Sign up User' });
  }
});



// login the user
router.post('/login-admin', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }

    if (user.password !== password) {
      return next(new ErrorHandler("Please provide the correct information", 400));
    }

     sendAdminToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// getuser
router.get("/getAdmin", isAdminAuthenticated, async (req, res, next) => {
  try {
    const admin = await User.findOne({ _id: req.user.id }); // Update the parameter to be an object with the filter criteria

    if (!admin) {
      return next(new ErrorHandler("admin doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      admin,
    });
// console.log(user)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// Update user data
// router.put('/updateUser', async (req, res , next) => {
//   const { currentPassword, newPassword, firstName, lastName, userName, email, address, city, state } = req.body;

//   try {
//     // Find the user by userId
//     const user = await User.findOne({ email }).select("+password");


//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Update the user data
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.userName = userName;
//     user.email = email;
//     user.address = address;
//     user.city = city;
//     user.state = state;

//      // Check if newPassword is provided
//      if (newPassword) {
//       const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

//       if (!isPasswordMatch) {
//         return res.status(401).json({ success: false, message: 'Current password is incorrect' });
//       }

//       // Hash the new password and update user's password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//     }
//     // Save the updated user
//     await user.save();

//     res.status(200).json({ success: true, message: 'User data updated successfully' });
//   } catch (error) {
//     console.error(error);
//     return next(new ErrorHandler(error.message, 500));

//   }
// });



// router.put('/update-profilePic', upload.single('profilePic'), async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     const existsUser = await User.findById(userId);

//     if (!existsUser) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Check if the user has a profile picture to delete
//     if (existsUser.profilePic) {
//       const existAvatarPath = path.join('uploads', existsUser.profilePic);
//       fs.unlinkSync(existAvatarPath);
//     }

//     const fileUrl = req.file.filename;
//     existsUser.profilePic = fileUrl;
//     await existsUser.save();

//     res.status(200).json({
//       success: true,
//       user: existsUser,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });



// // get all users
// router.get('/getAllUsers', async (req, res, next) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));

//   }
// });


// logout  
router.get('/logout'  , async(req, res, next)=>{
  try {
    res.clearCookie('adminToken');

    res.status(201).json({
      success: true,
      message:" log out successfully"
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})




module.exports = router;
