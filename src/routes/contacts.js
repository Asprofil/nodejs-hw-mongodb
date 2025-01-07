const express = require('express');
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const { ctrlWrapper } = require('../utils/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const { contactSchema, updateContactSchema } = require('../models/contactValidation');

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

module.exports = router;
