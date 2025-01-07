require('dotenv').config();
const express = require('express');
const { initMongoConnection } = require('./db/initMongoConnection');
const contactsRouter = require('./routes/contacts');

const app = express();
app.use(express.json());

// Зміна шляху до маршруту
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

initMongoConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize server:', error.message);
});
