const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../authenticationMiddleware.js");

const {
  getAllProjects,
  getProjectsById,
  createNewProject,
  deleteProject,
  updateProject,
} = require("../controllers/project.controller");

// GET ALL
router.get("/api/projects", async (req, res) => {
  getAllProjects(req, res);
});

// GET ONE BY ID
router.get("/api/projects/:projectId", async (req, res) => {
  getProjectsById(req, res);
});

// CREATE
router.post("/api/newproject", async (req, res) => {
  createNewProject(req, res);
});

// UPDATE
router.put("/api/projects/:projectId", async (req, res) => {
  updateProject(req, res);
});

// DELETE
router.delete("/api/projects/:projectId", isAuthenticated, async (req, res) => {
  deleteProject(req, res);
});

module.exports = router;
