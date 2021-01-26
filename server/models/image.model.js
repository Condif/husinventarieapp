const mongoose = require("mongoose");

const ImgSchema = mongoose.Schema({
  userParentId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  data: { type: Buffer, require: true },
  contentType: { type: String, require: true },
});

const Image = mongoose.model("uploadedImg", ImgSchema);
module.exports = Image;
