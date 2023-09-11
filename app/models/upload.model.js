const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = Schema(
  {
    uploadName: {
      type: String,
      required: true,
    },
    avatarLink: {
      type: String,
      required: true,
    },
    avatar: {
      type: Buffer,
      required: true,
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

module.exports = mongoose.model('Upload', uploadSchema);
