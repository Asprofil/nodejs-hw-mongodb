const { getContactsService, createContactService, updateContactService, deleteContactService, getContactByIdService } = require('../services/contacts');

const getContacts = async (req, res) => {
    const contactsData = await getContactsService(req.query);
    res.json({ status: 200, message: 'Successfully found contacts!', data: contactsData });
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);
    if (!contact) throw new Error("Contact not found");
    res.json({ status: 200, message: 'Successfully found contact!', data: contact });
};

const createContact = async (req, res) => {
    const newContact = await createContactService(req.body);
    res.status(201).json({ status: 201, message: 'Successfully created a contact!', data: newContact });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await updateContactService(contactId, req.body);
    if (!updatedContact) throw new Error("Contact not found");
    res.json({ status: 200, message: 'Successfully patched a contact!', data: updatedContact });
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await deleteContactService(contactId);
    if (!deletedContact) throw new Error("Contact not found");
    res.status(204).send();
};

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };
