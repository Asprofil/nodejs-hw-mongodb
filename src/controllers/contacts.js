// controllers/contacts.js

const getContacts = (req, res) => {
  const contacts = [];  // Можете замінити на реальні дані з бази
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts',
    data: contacts,
  });
};

const getContact = (req, res) => {
  const { contactId } = req.params;
  const contact = {};  // Замініть на реальні дані з бази
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact',
    data: contact,
  });
};

module.exports = {
  getContacts,
  getContact,
};
