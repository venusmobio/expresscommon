// Controller logic for project

// constants
const constants = require('../utils/constants.util');

// Require services
const commonService = require('../services/common.service');

/*
    project List
    API URL = /projects
    Method = GET
*/
exports.list = async (req, res) => {
  try {
    const projectList = await commonService.operations('project', 'list');
    return res.status(200).json({
      status: true,
      message: constants.message(constants.projectModule, 'List'),
      data: projectList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.projectModule, 'List', false),
      error,
    });
  }
};

/*
    project Detail
    API URL = /projects/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const projectDetail = await commonService.operations('project', 'detail', {
      id: req.params.id,
    });
    if (!projectDetail) {
      return res.status(400).json({
        status: false,
        message: constants.notFound(constants.projectModule),
      });
    }
    return res.status(200).json({
      status: true,
      message: constants.message(constants.projectModule, 'Detail'),
      data: projectDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.projectModule, 'Detail', false),
      error,
    });
  }
};

/*
    project Create
    API URL = /projects
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    const createdproject = await commonService.operations('project', 'create', req.body);
    return res.status(200).json({
      status: true,
      message: constants.message(constants.projectModule, 'Create'),
      data: createdproject,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.projectModule, 'Create', false),
      error,
    });
  }
};

/*
    project Update
    API URL = /projects/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    req.body.id = req.params.id;
    const projectDetail = await commonService.operations('project', 'update', req.body);
    if (!projectDetail) {
      return res.status(400).json({
        status: false,
        message: constants.notFound(constants.projectModule),
      });
    }
    return res.status(200).json({
      status: true,
      message: constants.message(constants.projectModule, 'Update'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.projectModule, 'Update', false),
      error,
    });
  }
};

/*
    project Delete
    API URL = /projects/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    const projectDetail = await commonService.operations('project', 'delete', {
      id: req.params.id,
    });
    if (!projectDetail) {
      return res.status(400).json({
        status: false,
        message: constants.notFound(constants.projectModule),
      });
    }
    return res.status(200).json({
      status: true,
      message: constants.message(constants.projectModule, 'Delete'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.projectModule, 'Delete', false),
      error,
    });
  }
};
