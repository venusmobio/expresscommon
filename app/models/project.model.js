const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
