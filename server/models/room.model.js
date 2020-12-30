const mongoose = require("mongoose");
const { ProjectSchema } = require("./project.model");

const RoomSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "houseId"
  },
  roomName: {
    type: String,
    required: true,
  },
  roomSize: {
    type: Number,
    required: true,
  },
  roomHeight: {
    type: Number,
    required: true,
  },
//   items: {
//     type: [ItemSchema],
//   },
  projects: {
    type: [ProjectSchema],
  },
});

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
