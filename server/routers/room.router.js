const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");
const {
  getAllRooms,
  getOneRoom,
  createNewRoom,
  deleteRoom,
  updateRoom,
} = require("../controllers/room.controller");



// GET ALL
router.get("/api/rooms", async (req, res) => {
  getAllRooms(req, res);
});

// GET ONE BY ID
router.get("/api/rooms/:roomId", async (req, res) => {
  getOneRoom(req, res);
});

// CREATE
router.post("/api/newroom", async (req, res) => {
  createNewRoom(req, res);
});

// DELETE
router.delete("/api/rooms/:roomId", isAuthenticated, async (req, res) => {
  deleteRoom(req, res);
});

// UPDATE
router.put("/api/rooms/:roomId", async (req, res) => {
  updateRoom(req, res);
});

module.exports = router;
