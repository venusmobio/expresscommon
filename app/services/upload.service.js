const UploadModel = require('../models/upload.model.js');
exports.findByName = async name => {
  return UploadModel.findOne({ uploadName: name });
};
