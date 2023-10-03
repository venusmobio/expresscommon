// Require Packages
const jwt = require('jsonwebtoken');

// Require utils
const constants = require('../utils/constants.util');

// Require Services
const commonService = require('../services/common.service');

//for create token
exports.assignToken = async user => {
  const payload = {
    id: user._id,
  };
  return await jwt.sign(
    payload,
    process.env.JWT_SECRET ? process.env.JWT_SECRET : constants.JWT_SECRET_KEY,
    {}
  );
};

//for check-token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: constants.SEND_AUTH_TOKEN,
      });
    }
    if (token) {
      const decoded = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_SECRET ? process.env.JWT_SECRET : constants.JWT_SECRET_KEY
      );
      req.userData = decoded;

      if (decoded.id) {
        const user = await commonService.operations('user', 'detail', {
          id: decoded.id,
        });
        if (user) {
          req.userData.user = user;
        } else {
          return res.status(400).json({
            status: false,
            message: constants.USER_NOT_EXIST_OR_ACCESS,
          });
        }
      }
      next();
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: constants.UNAUTHENTICATED,
    });
  }
};
