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
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    summary: {
      type: String,
    },
    capacity: {
      type: Number,
      default: 0
    },
    area: {
      type: Number,
      default: 0
    },
    projectType: {
      type: String,
    },
    address: {
      type: String
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    priority: {
      type: String
    },
    teamId: {
      type: mongoose.Types.ObjectId,
      ref: 'Team',
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
    attachments: [{
      attachmentName: {
        type: String
      },
      url: {
        type: String
      }
    }],
    timeTrack: {
      type: String
    },
    duration: {
      type: String
    },
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
