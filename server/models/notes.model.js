const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  headerText: {
    type: String,
    required: true,
  },
  bodyText: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  imageId: {
    type: mongoose.Types.ObjectId,
    // required: true
  },
  roomId: {
    type: mongoose.Types.ObjectId,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
  },
});

const NoteModel = mongoose.model("Note", NoteSchema);
module.exports = NoteModel;
