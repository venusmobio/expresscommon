// Controller logic for upload

// require packages
const fs = require('fs');
const path = require('path');

// constants
const constants = require('../utils/constants.util');

// Require services
const commonService = require('../services/common.service');

/*
    Upload List
    API URL = /upload
    Method = GET
*/
exports.list = async (req, res) => {
  try {
    const uploadList = await commonService.operations('upload', 'list');
    return res.status(200).json({
      status: true,
      message: constants.message(constants.uploadModule, 'List'),
      data: uploadList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.uploadModule, 'List', false),
      error: error,
    });
  }
};

/*
    Upload Detail
    API URL = /upload/:id
    Method = GET
*/
exports.detail = async (req, res) => {
  try {
    const uploadDetail = await commonService.operations('upload', 'detail', {
      id: req.params.id,
    });
    return res.status(200).json({
      status: true,
      message: constants.message(constants.uploadModule, 'Detail'),
      data: uploadDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.uploadModule, 'Detail', false),
      error: error,
    });
  }
};

/*
    Upload Create
    API URL = /upload
    Method = POST
*/
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: constants.cantBeEmpty('file'),
      });
    }
    const uploadExist = await commonService.operations('upload', 'detail', {
      uploadName: req.file.originalname,
    });
    if (uploadExist) {
      return res.status(400).json({
        status: false,
        message: constants.alreadyExist(constants.uploadModule),
      });
    }
    const image = req.file.path;
    const imageBuffer = fs.readFileSync(image);
    const absolutePath = path.resolve(image);
    req.body.avatar = imageBuffer;
    req.body.uploadName = req.file.originalname;
    req.body.avatarLink = absolutePath;
    const createdUpload = await commonService.operations('upload', 'create', req.body);
    return res.status(200).json({
      status: true,
      message: constants.message(constants.uploadModule, 'Create'),
      data: createdUpload,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.uploadModule, 'Create', false),
      error: error,
    });
  }
};

/*
    Upload Update
    API URL = /upload/:id
    Method = PUT
*/
exports.update = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: constants.cantBeEmpty('file'),
      });
    }
    const uploadExist = await commonService.operations('upload', 'detail', {
      uploadName: req.file.originalname,
    });
    if (uploadExist) {
      return res.status(400).json({
        status: false,
        message: constants.alreadyExist(constants.uploadModule),
      });
    }
    req.body.id = req.params.id;
    const image = req.file.path;
    const imageBuffer = fs.readFileSync(image);
    const absolutePath = path.resolve(image);
    req.body.avatar = imageBuffer;
    req.body.uploadName = req.file.originalname;
    req.body.avatarLink = absolutePath;
    const uploadDetail = await commonService.operations('upload', 'detail', {
      id: req.params.id,
    });
    fs.unlink(uploadDetail.avatarLink, err => {
      if (err) throw err;
    });
    await commonService.operations('upload', 'update', req.body);
    return res.status(200).json({
      status: true,
      message: constants.message(constants.uploadModule, 'Update'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.uploadModule, 'Update', false),
      error: error,
    });
  }
};

/*
    Upload Delete
    API URL = /upload/:id
    Method = DELETE
*/
exports.delete = async (req, res) => {
  try {
    const uploadDetail = await commonService.operations('upload', 'detail', {
      id: req.params.id,
    });
    fs.unlink(uploadDetail.avatarLink, err => {
      if (err) throw err;
    });
    await commonService.operations('upload', 'delete', { id: req.params.id });
    return res.status(200).json({
      status: true,
      message: constants.message(constants.uploadModule, 'Delete'),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: constants.message(constants.uploadModule, 'Delete', false),
      error: error,
    });
  }
};
