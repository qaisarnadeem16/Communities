const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // Ensure uniqueness of email addresses
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  accountStatus: {
    type: String,
    default: 'active', // Corrected default value to 'active'
  },
  password: {
    type: String,
  },
  profileImage: {
    type: String, // You can store the path to the uploaded profile image here
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Community', // Reference to the Community model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.getJwtToken = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  } catch (error) {
    // Handle the error appropriately, such as logging or throwing a custom error
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate JWT token.');
  }
};

module.exports = mongoose.model('User', userSchema); // Capitalize the model name ('User')
