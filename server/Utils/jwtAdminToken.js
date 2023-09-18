const createAndSetAdminToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  return res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = createAndSetAdminToken;