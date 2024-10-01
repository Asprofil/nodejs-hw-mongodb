const mongoose = require('mongoose')
const initMongoConnection = async () => {
  try {
    const connectionString = `mongodb+srv://vityademchenko:gaUnC4wbWLD33L7@cluster0.3ovvy.mongodb.net/`;
    await mongoose.connect(connectionString, {
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
      console.error('Mongo connection failed:', error);
      process.exit(1);
  }
};

module.exports = initMongoConnection;
