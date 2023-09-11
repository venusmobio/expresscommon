// constants
const constants = require('../utils/constants.util');
const commonService = require('../services/common.service');
/*
    Task List
    API URL = /tasks
    Method = GET
*/
exports.list = async (req, res) => {
  try {
    const taskList = await commonService.operations('task', 'list');
    return res.json({
      status: true,
      message: constants.message(constants.taskModule, 'List'),
      data: taskList,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'List', false),
      error: error,
    });
  }
};

/*
    Task Detail
    API URL = /tasks/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const taskList = await commonService.operations('task', 'detail', {
      id: req.params.id,
    });
    return res.json({
      status: true,
      message: constants.message(constants.taskModule, 'Detail'),
      data: taskList,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.TaskModule, 'Detail', false),
      error: error,
    });
  }
};

/*
    Task Create
    API URL = /tasks
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    const createdTask = await commonService.operations('task', 'create', req.body);
    return res.json({
      status: true,
      message: constants.message(constants.taskModule, 'Create'),
      data: createdTask,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'Create', false),
      error: error,
    });
  }
};

/*
    Task Update
    API URL = /tasks/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    await commonService.operations('task', 'update', req.body);
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'Update'),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'Update', false),
      error: error,
    });
  }
};

/*
    Task Delete
    API URL = /tasks/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    await commonService.operations('task', 'delete', { id: req.params.id });
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'Delete'),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.taskModule, 'Delete', false),
      error: error,
    });
  }
};
