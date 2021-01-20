const House = require("../models/house.model");

// GET ALL
getAllHouses = async (req, res) => {
  await House.find()
    .populate("rooms")
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

// GET ONE
getOneHouse = async (req, res) => {
  await House.findById(req.params.houseId).populate("rooms")
    // .populate("houseId")

    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

// CREATE
createNewHouse = (req, res) => {
  const house = new House(req.body);

  house.save((err, house) => {
    if (err) {
      console.log("error", err);
      res.status(400).json(err);
    } else res.status(201).json(house);
  });
};

// DELETE
deleteHouse = async (req, res) => {
  try {
    const removeHouse = await House.deleteOne({
      _id: req.params.houseId,
    });
    res.status(200).json({ status: "removed room" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
updateHouse = async (req, res) => {
  try {
    let updatedHouse = await House.updateOne(
      { _id: req.params.houseId },
      {
        $set: {
          houseName: req.body.houseName,
          houseCategory: req.body.houseCategory,
          houseSize: req.body.houseSize,
          numberOfRooms: req.body.numberOfRooms,
          rooms: req.body.rooms,
          projects: req.body.projects
        },
      }
    );
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllHouses,
  getOneHouse,
  createNewHouse,
  deleteHouse,
  updateHouse,
};
