const Note = require("../models/notes.model");

// GET ALL
getAllNotes = async (req, res) => {
  await Note.find()
    // .populate("houseId")
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

// GET ONE
getOneNote = async (req, res) => {
  await Note.findById(req.params.noteId)
    // .populate("houseId")

    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

// CREATE
createNewNote = (req, res) => {
  const note = new Note(req.body);

  note.save((err, notee) => {
    if (err) {
      console.log("error", err);
      res.status(400).json(err);
    } else res.status(201).json(note);
  });
};

// DELETE
deleteNote = async (req, res) => {
  try {
    const removeNote = await Note.deleteOne({
      _id: req.params.noteId,
    });
    res.status(200).json({ status: "removed note" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
updateNote = async (req, res) => {
  try {
    let updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      {
        $set: {
          headerText: req.body.headerText,
          bodyText: req.body.bodyText,
          date: req.body.date,
          
        },
      }
    );
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllNotes,
  getOneNote,
  createNewNote,
  deleteNote,
  updateNote,
};
