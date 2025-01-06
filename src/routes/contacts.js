const express = require('express');
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const { ctrlWrapper } = require('../utils/ctrlWrapper');

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(createContact));
router.patch('/:contactId', ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));

module.exports = router;
