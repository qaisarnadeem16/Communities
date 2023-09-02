const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  
    email: {
        type: 'string',
        require: [true, 'please enter a email ']
    },
    password: {
        type: 'string',
        require: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    role: {
        type: String,
        default: "Super Admin",
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

})




// // jwt token 
userSchema.methods.getJwtToken = function () {
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


module.exports = mongoose.model("admin", userSchema);