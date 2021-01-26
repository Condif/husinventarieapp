const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  data: { type: Buffer, require: true },
  contentType: { type: String, require: true },
});

const File = mongoose.model("uploadedFile", FileSchema);
module.exports = File;
