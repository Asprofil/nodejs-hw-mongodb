require('dotenv').config();

const initMongoConnection = require('./db/initMongoConnection');
const setupServer = require('./server');

(async () => {
  await initMongoConnection();
  setupServer();
})();
