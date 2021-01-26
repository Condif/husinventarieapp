const isAuthenticated = (req, res, next) => {
  console.log(req.session.userId, " id");
  if (req.session.userId) {
    return next();
  }
  else {
    console.log("auth error");
  }
};

exports.isAuthenticated = isAuthenticated;
