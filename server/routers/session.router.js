const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");

const { logInUser, logOutUser } = require("../controllers/session.controller");

const User = require("../models/user.model");
// LOGIN

router.post("/api/session/login", async (req, res) => {
  logInUser(req, res);
});

// CHECK-AUTH
router.post("/api/session/auth", async (req, res) => {
  console.log("session", req.session.userId);

  if (req.session.userId) {
    try {
      // find userid i dabasen
      const user = await User.findById(req.session.userId);

      if (user) {
        req.session.userId = user[0]._id;

        user.password = "";

        return res.status(200).json({
          message: "Auth successful",
          user,
        });
      }
      console.log("hittad");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
// LOGOUT
router.post("/api/session/logout", logOutUser);

module.exports = router;
