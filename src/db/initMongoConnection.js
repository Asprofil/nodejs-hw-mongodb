const mongoose = require('mongoose');

// Функція для підключення до MongoDB
const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

    // Перевірка на наявність всіх необхідних змінних оточення
    if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
      throw new Error('One or more MongoDB environment variables are missing.');
    }

    // Формування URI для підключення до MongoDB
    const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
    console.log(`MongoDB URI: ${uri}`); // Логування URI для перевірки

    // Підключення до MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Завершення процесу при помилці підключення
  }
};

module.exports = { initMongoConnection };
