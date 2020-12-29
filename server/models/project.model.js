const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
        // required: true
    },
    imageId: {
        type: mongoose.Types.ObjectId,
        // required: true
       
    },
    description: {
        type: String,
        // required: true
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
//   items: {
//     type: [ItemSchema],
//   },
//   journal: {
//     type: [JournalSchema],
//   },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;