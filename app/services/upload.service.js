const UploadModel = require('../models/upload.model.js');
exports.findByName = async name => {
  return await UploadModel.findOne({ uploadName: name });
};
