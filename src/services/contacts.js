const Contact = require('../models/Contact')

const getAllContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

const getContactById = async (id) => {
  const contact = await Contact.findById(id)
  return contact
}

module.exports = { getAllContacts, getContactById }
