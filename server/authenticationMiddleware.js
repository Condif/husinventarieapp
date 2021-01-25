const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  else {
    console.log("auth error");
  }
};

exports.isAuthenticated = isAuthenticated;
