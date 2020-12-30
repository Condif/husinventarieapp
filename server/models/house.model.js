const mongoose = require("mongoose");
const { RoomSchema } = require("./room.model");
const { ProjectSchema } = require("./project.model");
const HouseSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  houseCategory: {
    type: String,
  },
  houseSize: {
    type: Number,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
  ],
  projects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const HouseModel = mongoose.model("House", HouseSchema);
module.exports = HouseModel;
