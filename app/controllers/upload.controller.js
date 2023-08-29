// Controller logic for upload

// constants
const constants = require("../utils/constants.util");
const commonService = require("../services/common.service");
const fs = require("fs");


/*
    Upload List
    API URL = /upload
    Method = GET
*/
exports.list = async (req, res, next) => {
  try {
    const uploadList = await commonService.operations("upload", "list");
    return res.json({
      status: true,
      message: constants.message(constants.uploadModule, "List"),
      data: uploadList,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "List", false),
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
    const uploadDetail = await commonService.operations("upload", "detail", {
      id: req.params.id,
    });
    return res.json({
      status: true,
      message: constants.message(constants.uploadModule, "Detail"),
      data: uploadDetail,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Detail", false),
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
    req.body.uploadName = req.file.path;
    const createdUpload = await commonService.operations(
      "upload",
      "create",
      req.body
    );
    return res.json({
      status: true,
      message: constants.message(constants.uploadModule, "Create"),
      data: createdUpload,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Create", false),
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
    req.body.id = req.params.id;
    req.body.uploadName = req.file.path;
    const uploadDetail = await commonService.operations("upload", "detail", {
      id: req.params.id,
    });
    fs.unlink(uploadDetail.uploadName, (err) => {
      if (err) throw err;
    });
    await commonService.operations("upload", "update", req.body);
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Update"),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Update", false),
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
    const uploadDetail = await commonService.operations("upload", "detail", {
      id: req.params.id,
    });
    fs.unlink(uploadDetail.uploadName, (err) => {
      if (err) throw err;
    });
    await commonService.operations("upload", "delete", { id: req.params.id });
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Delete"),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: constants.message(constants.uploadModule, "Delete", false),
      error: error,
    });
  }
};
