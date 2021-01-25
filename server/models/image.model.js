const mongoose = require('mongoose');

const ImgSchema = mongoose.Schema({
    data:{ type: Buffer, require: true },
    contentType: { type: String, require: true }
});




const Image = mongoose.model('uploadedImg', ImgSchema);
module.exports = Image