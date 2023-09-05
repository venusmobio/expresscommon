const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    description: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date },
    priority: { type: String },
    tags: { type: String },
    milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
    checklists: [{
        type: String
    }],
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    watchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timeTrack: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
