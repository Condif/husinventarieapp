const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");

const {
    getAllItems,
    getItemsById,
    createNewItem,
    updateItem,
    deleteItem
} = require("../controllers/item.controller");

// GET ALL
router.get("/api/items", async (req, res) => {
  getAllItems(req, res);
});

// GET ONE BY ID
router.get("/api/items/:itemId", async (req, res) => {
  getItemsById(req, res);
});

// CREATE
router.post("/api/newitem", async (req, res) => {
  createNewItem(req, res);
});

// UPDATE
router.put("/api/items/:itemId", async (req, res) => {
  updateItem(req, res);
});

// DELETE
router.delete("/api/items/:itemId", isAuthenticated, async (req, res) => {
  deleteItem(req, res);
});

module.exports = router;