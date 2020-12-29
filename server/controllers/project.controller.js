const Project = require("../models/project.model");

// GET ALL
const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
};
// GET ONE
const getProjectsById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        res.status(200).json(project);
      } catch (err) {
        res.status(500).json(err);
      }
};
// CREATE NEW 
const createNewProject = async (req, res) => {
    const project = new Project(req.body);

    project.save((err, project) => {
        if (err) {
        console.log("error", err);
        res.status(400).json(err);
        } else res.status(201).json(project);
    });
};

// UPDATE
const updateProject = async (req, res) => {
    try {
      let project = await Project.findById(req.params.projectId);
  
      if (project) {
        project.projectName = project.projectName;
        project.imageId = project.imageId;
        project.description = project.description;
        project.roomId = project.roomId ;
        project.category = project.category;
        await project.save();
  
        res.status(200).json(project);
      } else {
        res.status(404).json({ status: "Project not found in db" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };


// DELETE

const deleteProject = async (req, res) => {
    try {
      const removedProject = await Project.deleteOne({ _id: req.params.projectId });
      res.status(200).json(removedProject);
    } catch (err) {
      res.status(500).json(err);
    }
  };
module.exports = {
    getAllProjects,
    getProjectsById,
    createNewProject,
    updateProject,
    deleteProject
};