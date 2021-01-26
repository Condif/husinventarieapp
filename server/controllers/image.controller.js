const Image = require("../models/image.model");

// GET ONE
getImg = async (req, res) => {
  try {
    const image = await Image.findById({ _id: req.params.id });
    if (!image) {
      // todo....
    }

    res.contentType(image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(200).send({ get_error: "Error while getting image" });
  }
};

// GET ALL IMAGEID
getAllImages = async (req, res) => {
  try {
    const imageIds = await Image.find({}, "_id").exec();
    res.status(200).json(imagesIds);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ONE
deleteImg = async (req, res) => {
  console.log({ _id: req.params.id },"delete");
  try {
    const image = await Image.deleteOne({ _id: req.params.id });
    if (!image) {
      // todo....
    }
    res.status(200).json({message: "Image deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// POST
newImage = (req, res) => {
  console.log("ny fil", req.files);
  if (!req.files || !req.files.image) {
    // Ingen fil har skickats med... Se till använda namn:image på input fältet...
  }

  const image = new Image({
    data: req.files.image.data,
    contentType: req.files.image.mimetype,
  });

  image.save((err, image) => {
    if (err) {
      res.status(400).json(err);
    } else {
      image.data = undefined;
      res.status(201).json(image);
    }
  });
};

module.exports = { newImage, getImg, getAllImages, deleteImg };
