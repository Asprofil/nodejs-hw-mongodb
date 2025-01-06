const createHttpError = require('http-errors');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Session = require('../models/session');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Перевірка наявності користувача з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, 'Email in use'));
    }

    // Створення нового користувача
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Видаляємо пароль з відповіді
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Знаходимо користувача за email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, 'Invalid credentials'));
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(401, 'Invalid credentials'));
    }

    // Генерація токенів
    const accessToken = jwt.sign({ id: user._id }, 'accessSecret', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, 'refreshSecret', { expiresIn: '30d' });

    // Видалення старої сесії
    await Session.findOneAndDelete({ userId: user._id });

    // Створення нової сесії
    const session = new Session({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    await session.save();

    // Відправка токену в cookies
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(createHttpError(401, 'No refresh token found'));
    }

    const decoded = jwt.verify(refreshToken, 'refreshSecret');
    const session = await Session.findOne({ userId: decoded.id, refreshToken });

    if (!session) {
      return next(createHttpError(401, 'Invalid session'));
    }

    // Генерація нових токенів
    const newAccessToken = jwt.sign({ id: decoded.id }, 'accessSecret', { expiresIn: '15m' });

    // Оновлення сесії
    session.accessToken = newAccessToken;
    session.accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
    await session.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed session!',
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await Session.findOneAndDelete({ refreshToken });
    }

    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, refreshSession, logoutUser };
