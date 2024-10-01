const express = require('express');
const cors = require('cors');
const pino = require('pino'); // Використовується для логування HTTP-запитів
const { getContacts, getContact } = require('./controllers/contacts'); // Імпорт контролерів

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pino);

  // Middleware для обробки JSON
  app.use(express.json());

  // Маршрут для отримання всіх контактів
  app.get('/contacts', getContacts); // Використовуємо контролер для отримання всіх контактів

  // Маршрут для отримання одного контакту за його ID
  app.get('/contacts/:contactId', getContact); // Використовуємо контролер для одного контакту

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = setupServer;
