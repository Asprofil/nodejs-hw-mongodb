const express = require('express');
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const { contactSchema, updateContactSchema } = require('../models/contactValidation');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadPhoto, updateContact } = require('../controllers/contacts');

router.get('/', getContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(contactSchema), createContact);
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), updateContact);
router.delete('/:contactId', isValidId, deleteContact);
router.post('/contacts', upload.single('photo'), uploadPhoto);
router.patch('/contacts/:contactId', upload.single('photo'), updateContact);

module.exports = router;
