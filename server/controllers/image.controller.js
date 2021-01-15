const Image = require("../models/image.model");

// GET ONE
getImg = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
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
    console.log(imageIds);
    res.status(200).json(imagesIds);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST
newImage = (req, res) => {
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
  console.log(image, "newImage");
};

module.exports = { newImage, getImg, getAllImages };
