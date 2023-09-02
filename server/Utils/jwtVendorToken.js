// create token and saving that in cookies
const sendVendorToken = (vendor, statusCode, res) => {
    const token = vendor.getJwtToken();
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      Secure: true,
    };
  
    res.status(statusCode).cookie("vendorToken", token, options).json({
      success: true,
      vendor,
      token,
    });
  };
  
  module.exports = sendVendorToken;