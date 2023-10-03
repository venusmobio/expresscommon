// Simple crud
exports.operations = async (modelName, action, payload = {}) => {
  const model = require(`../models/${modelName}.model`);

  switch (action) {
    case 'list':
      return model.find(payload);
    case 'detail':
      if (payload.id) {
        payload._id = payload.id;
      }
      delete payload.id;
      return model.findOne(payload);
    case 'create':
      return model.create(payload);
    case 'update':
      return model.findByIdAndUpdate({ _id: payload.id }, payload);
    case 'delete':
      return model.findByIdAndDelete({ _id: payload.id });
    default:
      console.log('testing');
  }
};
