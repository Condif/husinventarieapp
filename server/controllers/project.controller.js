const Project = require("../models/project.model");

// GET ALL
const getAllProjects = async (req, res) => {

  await Project.find({userParentId: {$in: req.session.userId}})
    .populate("itemsId")
    .populate("roomId")
    .populate("notesId")
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
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
    const newProject = {
      projectName: req.body.projectName,
      userParentId: req.session.userId,
      imageId: req.body.imageId,
      description: req.body.description,
      roomId: req.body.roomId,
      category: req.body.category,
      notesId: req.body.notesId,
      itemsId: req.body.items
    }
    const project = new Project(newProject);

    project.save((err, project) => {
        if (err) {
        console.log("error", err);
        res.status(400).json(err);
        } else res.status(201).json(project);
    });
};

// UPDATE
const updateProject = async (req, res) => {
  console.log(req.body.itemsId, "req.body.itemsid");
  console.log(req.params.projectId, "req.body.projectid");
  try {

    const updatedProject = await Project.updateOne(
      { _id: req.params.projectId },
      { 
        $set: {
          projectName: req.body.projectName,
          userParentId: req.session.userId,
          imageId: req.body.imageId,
          description: req.body.description,
          roomId: req.body.roomId,
          category: req.body.category,
          itemsId: req.body.itemsId,
          notesId: req.body.notesId
        },
      }
    )
    
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};


// DELETE

const deleteProject = async (req, res) => {
    try {
      const removedProject = await Project.deleteOne({ _id: req.params.projectId });
      res.status(200).json({message: "project deleted"});
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