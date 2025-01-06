const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.patch('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
