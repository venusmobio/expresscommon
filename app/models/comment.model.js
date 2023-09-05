const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    description: { type: String,  },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
