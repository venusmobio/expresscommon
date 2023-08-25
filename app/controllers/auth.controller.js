/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// Require Packages
const bcrypt = require('bcryptjs');

// Require utils
const constants = require('../utils/constants.util');

// Require services
const commonService = require('../services/common.service');
const authService = require('../services/auth.service');

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
      return res.json({
        status: false,
        message: constants.notFound(constants.userModule),
      });
    }

    // check requested password is match with existing password
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({
        status: false,
        message: constants.message(constants.authModule, 'Password', false),
      });
    }

    // If password matches
    if (user.loginActivity.length > 0) {
      const deviceId = req?.body?.deviceInfo?.deviceId;
      const alreadyExistDevice = user.loginActivity.find(
        (item) => item.deviceId === deviceId
      );
      if (alreadyExistDevice) {
        // Update logout time of particular device id
        user.loginActivity = user.loginActivity.map((item) => {
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

    return res.json({
      status: true,
      message: constants.message(constants.authModule, 'Login'),
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.json({
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
      return res.json({
        status: false,
        message: constants.alreadyExist(constants.userModule),
      });
    }

    // encrypt the password using bcryptjs
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    req.body.isActive = true;
    // Create new user with the it's detail
    const newUser = await commonService.operations('user', 'create', req.body);

    return res.json({
      status: true,
      message: constants.message(constants.authModule, 'Signup'),
      data: newUser,
    });
  } catch (error) {
    return res.json({
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
    user.loginActivity = user.loginActivity.map((item) => {
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

    return res.json({
      status: false,
      message: constants.message(constants.userModule, 'Logout'),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.authModule, 'Signup', false),
      error,
    });
  }
};
