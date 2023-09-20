// Required package for environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;

// express configuration
const app = require('./app/server');

// Server listen at default 3000 port
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

module.exports = app;
