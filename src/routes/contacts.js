const express = require('express');
const { validateBody, isValidId } = require('../middlewares/validation');
const { contactValidationSchema } = require('../models/validationSchemas');
const Contact = require('../models/contact');

const router = express.Router();

// Створення контакту
router.post('/', validateBody(contactValidationSchema), async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ message: 'Contact created', data: newContact });
});

// Отримання контактів з пагінацією та сортуванням
router.get('/', async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
  const skip = (page - 1) * perPage;

  const totalItems = await Contact.countDocuments();
  const contacts = await Contact.find()
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(Number(perPage));

  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
});

// Отримання контакту за ID
router.get('/:id', isValidId, async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.json({ message: 'Successfully found contact!', data: contact });
});

// Оновлення контакту
router.patch('/:id', isValidId, validateBody(contactValidationSchema), async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.json({ message: 'Contact updated', data: updatedContact });
});

module.exports = router;
