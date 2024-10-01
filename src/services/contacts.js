const Contact = require('../models/contact');

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

module.exports = {
  getAllContacts
};
const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById
};
