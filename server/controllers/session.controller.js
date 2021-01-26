const bcrypt = require("bcrypt");
const User = require("../models/user.model");
// LOG IN
const logInUser = async (req, res) => {
  
  await User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed at start",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: " Auth failed",
          });
        }
        if (result) {
          req.session.userId = user[0].id;

          user[0].password = "";

          return res.status(200).json({
            message: "Auth successful",
            user,
          });
        }
        res.status(401).json({
          message: " Auth failed",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
  
// LOGOUT
const logOutUser = async (req, res) => {
  try {
    req.session = null;
    res.status(200).send("Successfully logged out user");
  } catch {
    res.status(400).send("Could not log out user");
  }
};

module.exports = {
  logInUser,
  logOutUser,
};