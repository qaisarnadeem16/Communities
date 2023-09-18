const ErrorHandler = require("../Utils/ErrorHandler")
const jwt = require('jsonwebtoken')
const User = require('../Model/UserModel')
const Admin = require('../Model/AdminModel');
const Vendor = require("../Model/VendorModel");


exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new ErrorHandler("Please login to continue", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    next(error);
  }
};

exports.isAdminAuthenticated = async (req, res, next) => {
  const adminToken = req.universalCookies.get('adminToken')
  try {
    if (!adminToken) {
      throw new ErrorHandler("Please admin login to continue", 401);
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);

    req.user = await Admin.findById(decoded.id);

    next();
  } catch (error) {
    next(error);
  }
};

exports.isVendorAuthenticated = async (req, res, next) => {
  const { vendorToken } = req.cookies;
  try {
    if (!vendorToken) {
      throw new ErrorHandler("Please vendor login to continue", 401);
    }

    const decoded = jwt.verify(vendorToken, process.env.JWT_SECRET_KEY);

    req.user = await Vendor.findById(decoded.id);

    next();
  } catch (error) {
    next(error);
  }
};