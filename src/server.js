const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contacts');
const setupServer = () => {
const app = express();

// Middleware для парсингу JSON
app.use(express.json());

// Роутинг
app.use('/contacts', contactsRouter);

// Обробник помилок
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
}
module.exports = { setupServer }
// Підключення до MongoDB та запуск серверу