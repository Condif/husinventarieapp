const mongoose = require("mongoose");
const { ItemSchema } = require("./item.model");

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
    items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
    }]
//   journal: {
//     type: [JournalSchema],
//   },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;