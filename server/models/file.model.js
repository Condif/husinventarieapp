const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  name: {
    type: String,
  },
  userParentId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  data: { type: Buffer, require: true },
  contentType: { type: String, require: true },
});

const File = mongoose.model("uploadedFile", FileSchema);
module.exports = File;
