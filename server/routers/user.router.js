const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");
const {
  getAllUsers,
  getOneById,
  newUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const User = require("../models/user.model");

// GET ALL
router.get("/api/users", async (req, res) => {
  getAllUsers(req, res);
});

// GET ONE BY ID
router.get("/api/users/:userId", async (req, res) => {
  getOneById(req, res);
});

// CREATE
router.post("/api/newuser", async (req, res) => {
  newUser(req, res);
});

// DELETE
router.delete("/api/users/:userId", isAuthenticated, async (req, res) => {
  deleteUser(req, res);
});

// UPDATE
router.put("/api/users/:userId", async (req, res) => {
  updateUser(req, res);
});

module.exports = router;
