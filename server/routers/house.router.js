const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");
const {
  getAllHouses,
  getOneHouse,
  createNewHouse,
  deleteHouse,
  updateHouse,
} = require("../controllers/house.controller");



// GET ALL
router.get("/api/houses", async (req, res) => {
  getAllHouses(req, res);
});

// GET ONE BY ID
router.get("/api/houses/:houseId", async (req, res) => {
  getOneHouse(req, res);
});

// CREATE
router.post("/api/newhouse", async (req, res) => {
  createNewHouse(req, res);
});

// DELETE
router.delete("/api/houses/:houseId", isAuthenticated, async (req, res) => {
  deleteHouse(req, res);
});

// UPDATE
router.put("/api/houses/:houseId", async (req, res) => {
  updateHouse(req, res);
});

module.exports = router;
