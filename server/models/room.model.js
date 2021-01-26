const mongoose = require("mongoose");
const { ProjectSchema } = require("./project.model");

const RoomSchema = mongoose.Schema({
  houseId: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "House",
    },
  ],
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

  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
