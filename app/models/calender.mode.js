const mongoose = require('mongoose');

const calenderSchema = new mongoose.Schema(
  {
    description: { type: String },
    title: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    guestList: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    attachments: [{ type: String }],
    meetingLink: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Calender', calenderSchema);
