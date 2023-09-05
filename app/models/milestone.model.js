const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    name: { type: String,  },
    status: { type: String,  },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', },
    progress: { type: String,  },
    startDate: { type: Date,  },
    endDate: { type: Date,  },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
