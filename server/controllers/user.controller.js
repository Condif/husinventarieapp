const User = require("../models/user.model");

// GET ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
// GET ONE
const getOneById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
}

// CREATE NEW USER
const newUser = async (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    postCode: req.body.postCode,
    city: req.body.city,
    password: req.body.password,
    role: "user",
  };

  User.findOne({ email: userData.email }, (err, queriedUser) => {
    if (err) {
      console.log("Error finding user in database", err);
      return;
    }

    if (!queriedUser) {
      User.create(userData, (err, user) => {
        if (err) {
          console.log(err);

          res.status(400).json(err);
        } else {
          //store authentication session
          req.session.userId = user._id;

          res.status(201).json({ status: "Authenticated", user });
        }
      });
    } else {
      res.status(401).json({ status: "E-mail already taken" });
    }
  });
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json("User removed");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);

    if (user) {
      user.firstName = user.firstName;
      user.lastName = user.lastName;
      user.phoneNumber = req.body.phoneNumber;
      user.email = user.email;
      user.address = req.body.address;
      user.postCode = req.body.postCode;
      user.city = req.body.city;
      user.creditcardnumber = req.body.creditcardnumber;
      user.password = user.password;
      user.role = "customer";
      await user.save();

      res.status(200).json(user);
    } else {
      res.status(404).json({ status: "User not found in db" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getOneById,
  newUser,
  deleteUser,
  updateUser,
  getLoggedInUser
};
