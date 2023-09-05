const mongoose = require('mongoose');

const ProjectActivitySchema = new mongoose.Schema({
    title: { type: String,  },
    description: { type: String,  },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    newStatus: { type: String,  },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', },
    previousStatus: { type: String,  },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
}, { timestamps: true });

module.exports = mongoose.model('ProjectActivity', ProjectActivitySchema);
