// require packages
const mongoose = require('mongoose');
// environment variables
const { DB_USERNAME, DB_NAME, DB_PASSWORD, DB_HOST, DATABASE_URL, NODE_ENV } = process.env;

let url = '';

// db connection environment wise
switch (NODE_ENV) {
  case 'local':
    url = 'mongodb://0.0.0.0:27017/prolink-develop?authMechanism=DEFAULT&authSource=admin';
    break;
  case 'test':
    url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
    break;
  case 'testing':
    url = 'mongodb://0.0.0.0:27017/test-datbase?authMechanism=DEFAULT&authSource=admin';
    break;
  default:
    url = DATABASE_URL;
    break;
}

// DB Connection Start
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED SUCCESSFULLY...'))
  .catch(err => console.error(err));
