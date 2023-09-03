const express = require('express');
const User = require('../Model/UserModel');
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
router.post('/create-user', upload.single('profileImage'), async (req, res, next) => {
  try {
    const { username, email, phoneNumber, address, password, gender } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const fileUrl = req.file.filename;

    const user = new User({
      username,
      email,
      phoneNumber,
      address,
      gender,
      password,
      profileImage:fileUrl
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// login the user
router.post('/login-user', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Something Missing' });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: 'User don`nt exists' });

    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Please provide Correct Password' });

    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// getuser
router.get("/getuser", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id }); // Update the parameter to be an object with the filter criteria

    if (!user) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// get all users
router.get('/getAllUsers', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
});

//fetch a user by its id
router.get('/getUser/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update user data
router.put('/updateUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    // Update the quiz in the database
    const user = await User.findByIdAndUpdate(id, updateUser, { new: true });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});


// delete user
router.delete('/deleteUser/:userId', async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Delete the user using deleteOne method on the model
    await User.deleteOne({ _id: userId });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500));
  }
});



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





// logout  
router.get('/logout', async (req, res, next) => {
  try {
    res.clearCookie('token');

    res.status(201).json({
      success: true,
      message: " log out successfully"
    })

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})




module.exports = router;