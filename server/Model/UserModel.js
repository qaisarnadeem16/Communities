const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String, // Use proper Mongoose schema type
    },
    email: {
        type: String, // Use proper Mongoose schema type
    },
    number: {
        type: Number, // Use proper Mongoose schema type
    },
    city: {
        type: String, // Use proper Mongoose schema type
    },
    country: {
        type: String, // Use proper Mongoose schema type
    },
    password: {
        type: String, // Use proper Mongoose schema type
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("user", userSchema);
