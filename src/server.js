const express = require('express');
const cors = require('cors');
const pino = require('pino')();

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Not found route
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    pino.info(`Server is running on port ${port}`);
  });
};

module.exports = setupServer;
