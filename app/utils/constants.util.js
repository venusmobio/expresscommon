module.exports = {
  message: (module, action, status = true) => {
    return `${module} ${action} ${status ? 'Success' : 'Failed'}`;
  },
  notFound: module => {
    return `${module} Not Found`;
  },
  alreadyExist: module => {
    return `${module} Already Exist`;
  },
  cantBeEmpty: fieldName => {
    return `${fieldName} can not be empty`;
  },
  userModule: 'User',
  authModule: 'Auth',
  projectModule: 'Project',
  taskModule: 'Task',
  uploadModule: 'Upload',
  SEND_AUTH_TOKEN: 'Please send authentication token',
  JWT_SECRET_KEY: 'jwt_secret_key',
  USER_NOT_EXIST_OR_ACCESS: 'User cant be access or not exist!',
  UNAUTHENTICATED: 'Unauthenticated!',
  INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token',
};
