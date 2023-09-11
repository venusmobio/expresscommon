// Controller logic for project

// constants
const constants = require('../utils/constants.util');
const commonService = require('../services/common.service');

/*
    project List
    API URL = /project
    Method = GET
*/
exports.list = async (req, res) => {
  try {
    const projectList = await commonService.operations('project', 'list');
    return res.json({
      status: true,
      message: constants.message(constants.projectModule, 'List'),
      data: projectList,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'List', false),
      error,
    });
  }
};

/*
    project Detail
    API URL = /project/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const projectDetail = await commonService.operations('project', 'detail', {
      id: req.params.id,
    });
    return res.json({
      status: true,
      message: constants.message(constants.projectModule, 'Detail'),
      data: projectDetail,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Detail', false),
      error,
    });
  }
};

/*
    project Create
    API URL = /project
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    const createdproject = await commonService.operations('project', 'create', req.body);
    return res.json({
      status: true,
      message: constants.message(constants.projectModule, 'Create'),
      data: createdproject,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Create', false),
      error,
    });
  }
};

/*
    project Update
    API URL = /project/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    await commonService.operations('project', 'update', req.body);
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Update'),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Update', false),
      error,
    });
  }
};

/*
    project Delete
    API URL = /project/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    await commonService.operations('project', 'delete', { id: req.params.id });
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Delete'),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.projectModule, 'Delete', false),
      error,
    });
  }
};
