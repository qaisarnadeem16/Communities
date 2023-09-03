const createAndSetAdminToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  // Options for cookies
  const options = {
    // The maximum age of the cookie in milliseconds.
    maxAge: 90 * 24 * 60 * 60 * 1000,
    // Indicates that the cookie should only be accessible to the browser.
    httpOnly: true,
    // Indicates that the cookie should only be sent over HTTPS.
    secure: true,
    // The domain that the cookie is valid for.
    domain: "https://communities-snowy.vercel.app",
  };

  res.status(statusCode).cookie("adminToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = createAndSetAdminToken;