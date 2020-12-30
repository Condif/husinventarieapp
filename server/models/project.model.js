const mongoose = require("mongoose");
const { NotesSchema } = require("./notes.model");

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String,
    // required: true
  },
  imageId: {
    type: mongoose.Types.ObjectId,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  //   items: {
  //     type: [ItemSchema],
  //   },
  Notes: {
    type: [NotesSchema],
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
