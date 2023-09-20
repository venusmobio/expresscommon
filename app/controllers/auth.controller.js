/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// Require Packages
const bcrypt = require('bcryptjs');

// Require utils
const constants = require('../utils/constants.util');

// Require services
const commonService = require('../services/common.service');
const authService = require('../services/auth.service');
const { sendMail } = require('../services/email.service');

// Require middlewares
const authMiddleware = require('../middlewares/auth.middleware');

/*
    Login
    API URL = /auth/login
    Method = POST
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: constants.notFound(constants.userModule),
      });
    }

    // check requested password is match with existing password
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        status: false,
        message: constants.message(constants.authModule, 'Password', false),
      });
    }

    // If password matches
    if (user.loginActivity.length > 0) {
      const deviceId = req?.body?.deviceInfo?.deviceId;
      const alreadyExistDevice = user.loginActivity.find(item => item.deviceId === deviceId);
      if (alreadyExistDevice) {
        // Update logout time of particular device id
        user.loginActivity = user.loginActivity.map(item => {
          if (item.deviceId === deviceId) {
            item.isLogin = true;
            item.loginCount += item.loginCount;
            item.loginTime = new Date();
            item.logoutTime = null;
          }
          return item;
        });
      } else {
        user.loginActivity.push({
          isLogin: true,
          loginTime: new Date(),
          loginCount: 1,
          logoutTime: null,
          deviceId: req?.body?.deviceInfo?.deviceId,
          deviceInfo: req.body?.deviceInfo,
        });
      }
    } else {
      // if there is no login activity then create one
      user.loginActivity.push({
        isLogin: true,
        loginTime: new Date(),
        loginCount: 1,
        logoutTime: null,
        deviceId: req?.body?.deviceInfo?.deviceId,
        deviceInfo: req.body?.deviceInfo,
      });
    }
    await commonService.operations('user', 'update', {
      id: user._id,
      loginActivity: user.loginActivity,
    });

    // assign new token
    const token = await authMiddleware.assignToken(user);

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'Login'),
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'Login', false),
      error,
    });
  }
};

/*
    Signup
    API URL = /auth/signup
    Method = POST
*/
exports.signup = async (req, res) => {
  try {
    const user = await authService.findByEmail(req.body.email);

    if (user) {
      return res.status(400).json({
        status: false,
        message: constants.alreadyExist(constants.userModule),
      });
    }

    // encrypt the password using bcryptjs
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    req.body.isActive = true;
    // Create new user with the it's detail
    const newUser = await commonService.operations('user', 'create', req.body);

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'Signup'),
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'Signup', false),
      error,
    });
  }
};

/*
    Logout
    API URL = /auth/logout
    Method = POST
*/
exports.logout = async (req, res) => {
  try {
    const { user } = req.userData;
    const { deviceId } = req.body;

    // Update logout time of particular device id
    user.loginActivity = user.loginActivity.map(item => {
      if (item.deviceId === deviceId) {
        item.isLogin = false;
        item.logoutTime = new Date();
      }
      return item;
    });

    // Update user login activity details
    await commonService.operations('user', 'update', {
      id: user._id,
      loginActivity: user.loginActivity,
    });

    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'Logout'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'Signup', false),
      error,
    });
  }
};

/*
    Forgot Password
    API URL = /auth/forgot-password
    Method = POST
*/
exports.forgotPassword = async (req, res) => {
  try {
    const { email, resetLink } = req.body;

    const user = await commonService.operations('user', 'detail', {
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: constants.notFound('Email'),
      });
    }

    // Generate reset token and set expiry
    const resetToken = bcrypt.hashSync(email, 10);
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    await commonService.operations('user', 'update', {
      id: user._id,
      resetToken,
      resetTokenExpiry,
    });

    const data = {
      projectName: '',
      resetLink,
      toEmail: email,
      subject: 'Forgot Password',
    };

    await sendMail(data);

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'forgotPassword'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'forgotPassword', false),
      error,
    });
  }
};

/*
    Reset Password
    API URL = /auth/reset-password
    Method = POST
*/
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await commonService.operations('user', 'detail', {
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: constants.INVALID_OR_EXPIRED_TOKEN,
      });
    }

    await commonService.operations('user', 'update', {
      id: user._id,
      password: bcrypt.hashSync(newPassword, 10),
      resetToken: null,
      resetTokenExpiry: null,
    });

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'resetPassword'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'resetPassword', false),
      error,
    });
  }
};

/*
    Profile
    API URL = /auth/profile
    Method = GET
*/
exports.profile = async (req, res) => {
  try {
    const { user } = req.userData;

    const isExist = await commonService.operations('user', 'detail', {
      id: user._id,
    });

    if (!isExist) {
      return res.status(401).json({
        status: false,
        message: constants.notFound('User'),
      });
    }

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'profile'),
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'profile', false),
      error,
    });
  }
};

/*
    Update profile
    API URL = /auth/update-profile
    Method = POST
*/
exports.updateProfile = async (req, res) => {
  try {
    const { user } = req.userData;

    const isExist = await commonService.operations('user', 'detail', {
      id: user._id,
    });

    if (!isExist) {
      return res.status(400).json({
        status: false,
        message: constants.notFound('User'),
      });
    }

    req.body.id = user._id;
    await commonService.operations('user', 'update', req.body);

    return res.status(200).json({
      status: true,
      message: constants.message(constants.authModule, 'update profile'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.authModule, 'update profile', false),
      error,
    });
  }
};
