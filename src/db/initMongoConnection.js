const mongoose = require('mongoose');

const initMongoConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useNewUrlParser: true, // ця опція більше не потрібна, можна прибрати
      useUnifiedTopology: true // ця опція більше не потрібна, можна прибрати
    });

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error);
    process.exit(1); // Завершити процес при невдалому підключенні
  }
};

module.exports = initMongoConnection;
