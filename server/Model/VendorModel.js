const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
  },
  headOffice: {
    type: String,
  },
  branch: {
    type: String,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
  },
  logo: {
    type: String, 
  }, 
  password: {
    type: 'string',
    require: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
},
});

vendorSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

vendorSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
// // jwt token 
vendorSchema.methods.getJwtToken = function () {
  try {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRE
      });
  } catch (error) {
      // Handle the error appropriately, such as logging or throwing a custom error
      console.error('Error generating JWT token:', error);
      throw new Error('Failed to generate JWT token.');
  }
};

const Vendor = mongoose.model('Vendors', vendorSchema);

module.exports = Vendor;
