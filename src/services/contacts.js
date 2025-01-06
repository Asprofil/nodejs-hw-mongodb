const Contact = require('../models/contact');

const getContactsService = async () => {
    return await Contact.find();
};

const getContactByIdService = async (id) => {
    return await Contact.findById(id);
};

const createContactService = async (contactData) => {
    return await Contact.create(contactData);
};

const updateContactService = async (id, contactData) => {
    return await Contact.findByIdAndUpdate(id, contactData, { new: true });
};

const deleteContactService = async (id) => {
    return await Contact.findByIdAndDelete(id);
};

module.exports = { getContactsService, getContactByIdService, createContactService, updateContactService, deleteContactService };
