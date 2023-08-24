const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
