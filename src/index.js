const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { initMongoConnection } = require('./db/initMongoConnection');
const authRouter = require('./routers/auth');

const app = express();

// ініціалізація підключення до MongoDB
initMongoConnection();

// Мідлвари
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Маршрути
app.use(authRouter);

// Обробка помилок
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
