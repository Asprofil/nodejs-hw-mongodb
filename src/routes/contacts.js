const express = require('express');
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const { contactSchema, updateContactSchema } = require('../models/contactValidation');

router.get('/', getContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(contactSchema), createContact);
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), updateContact);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
