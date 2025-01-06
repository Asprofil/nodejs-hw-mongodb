const express = require('express')
const { getContactsController, getContactByIdController } = require('../controllers/contacts')

const router = express.Router()

router.get('/', getContactsController)
router.get('/:contactId', getContactByIdController)

module.exports = router
