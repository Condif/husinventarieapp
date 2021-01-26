const mongoose = require("mongoose");
const { ProjectSchema } = require("./project.model");

const RoomSchema = mongoose.Schema({
  houseId: [
    {
      type: mongoose.Types.ObjectId,
      
      ref: "House",
    },
  ],
  roomName: {
    type: String,
    required: true,
  },
  userParentId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  roomSize: {
    type: String,
    required: true,
  },
  roomHeight: {
    type: String,
    required: true,
  },
    items: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Item" }]
    },

  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
