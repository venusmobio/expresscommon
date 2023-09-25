// constants
const constants = require('../utils/constants.util');

// Require services
const commonService = require('../services/common.service');
/*
    User List
    API URL = /users
    Method = GET
*/
exports.list = async (req, res) => {
  try {
    const userList = await commonService.operations('user', 'list');
    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'List'),
      data: userList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.userModule, 'List', false),
      error: error,
    });
  }
};

/*
    User Detail
    API URL = /users/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const userList = await commonService.operations('user', 'detail', {
      id: req.params.id,
    });
    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'Detail'),
      data: userList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.userModule, 'Detail', false),
      error: error,
    });
  }
};

/*
    User Create
    API URL = /users
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    const createdUser = await commonService.operations('user', 'create', req.body);
    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'Create'),
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.userModule, 'Create', false),
      error: error,
    });
  }
};

/*
    User Update
    API URL = /users/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    req.body.id = req.params.id;
    await commonService.operations('user', 'update', req.body);
    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'Update'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.userModule, 'Update', false),
      error: error,
    });
  }
};

/*
    User Delete
    API URL = /users/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    await commonService.operations('user', 'delete', { id: req.params.id });
    return res.status(200).json({
      status: true,
      message: constants.message(constants.userModule, 'Delete'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.userModule, 'Delete', false),
      error: error,
    });
  }
};
