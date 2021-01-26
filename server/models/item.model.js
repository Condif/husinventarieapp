const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true 
  },
  imageId: {
    type: mongoose.Types.ObjectId,
    // required: true 
  },
  userParentId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  description: {
      type: String,
  },
  fileId: [{
    type: mongoose.Types.ObjectId,
  }],
  orderDate: {
    type: String
  },
  warranty: {
      type: String,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
  },
  roomId: {
    type: mongoose.Types.ObjectId,
  }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;