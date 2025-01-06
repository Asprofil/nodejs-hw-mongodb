// Завантажуємо змінні оточення з .env файлу
require('dotenv').config();

// Імпортуємо функцію для підключення до MongoDB
const { initMongoConnection } = require('./db/initMongoConnection');

// Імпортуємо Express
const express = require('express');

// Ініціалізація Express додатку
const app = express();

// Налаштовуємо парсинг JSON у запитах
app.use(express.json());

// Функція для запуску сервера
const startApp = async () => {
  // Підключаємося до MongoDB
  await initMongoConnection();

  // Визначаємо простий маршрут
  app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
  });

  // Запускаємо сервер на порті 3000
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Запуск додатку
startApp();
