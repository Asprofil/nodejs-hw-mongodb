const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./src/routers/auth');
const contactsRouter = require('./src/routers/contacts');

dotenv.config();
const app = express();
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/contact-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Роутинг
app.use('/api', authRouter);
app.use('/api', contactsRouter);

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
