const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");
const {
  getAllNotes,
  getOneNote,
  createNewNote,
  deleteNote,
  updateNote,
} = require("../controllers/notes.controller");



// GET ALL
router.get("/api/notes", async (req, res) => {
  getAllNotes(req, res);
});

// GET ONE BY ID
router.get("/api/notes/:noteId", async (req, res) => {
  getOneNote(req, res);
});

// CREATE
router.post("/api/newnote", async (req, res) => {
  createNewNote(req, res);
});

// DELETE
router.delete("/api/notes/:noteId", isAuthenticated, async (req, res) => {
  deleteNote(req, res);
});

// UPDATE
router.put("/api/notes/:noteId", async (req, res) => {
  updateNote(req, res);
});

module.exports = router;
