const File = require("../models/file.model");

// GET ONE
getFile = async (req, res) => {
  try {
    const file = await File.findById({ _id: req.params.id });
    if (!file) {
      // todo....
    }

    res.contentType(file.contentType);
    res.send(file.data);
  } catch (error) {
    res.status(200).send({ get_error: "Error while getting file" });
  }
};

// GET ALL 
getAllFiles = async (req, res) => {
  
  try {
    const filesIds = await File.find({}, "_id").exec();
    console.log(filesIds);
    res.status(200).json(filesIds);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ONE
deleteFile = async (req, res) => {
  console.log({ _id: req.params.id },"delete");
  try {
    const file = await File.deleteOne({ _id: req.params.id });
    if (!file) {
      // todo....
    }
    res.status(200).json({message: "File deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// POST
newFile = (req, res) => {
console.log("ny fil", req.files);
  if (!req.files || !req.files.file) {
    // Ingen fil har skickats med... Se till använda namn:file på input fältet...
  }

  const file = new File({
    data: req.files.file.data,
    contentType: req.files.file.mimetype,
  });

  file.save((err, file) => {
    if (err) {
      res.status(400).json(err);
      console.log("error in saving");
    } else {
      file.data = undefined;
      res.status(201).json(file);
    }
  });
  console.log(file, "newFile");
};

module.exports = { newFile, getFile, getAllFiles, deleteFile };
