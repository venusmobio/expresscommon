const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    countryCode: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetToken: String,
    resetTokenExpiry: Date,
    loginActivity: [
      {
        isLogin: {
          type: Boolean,
          default: false,
        },
        loginCount: {
          type: Number,
          default: 0,
        },
        loginTime: {
          type: Date,
        },
        logoutTime: {
          type: Date,
        },
        deviceId: {
          type: String,
        },
        deviceInfo: {
          type: Object,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
