const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String },
    description: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
