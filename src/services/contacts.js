const Contact = require('../models/contact');

const getContactsService = async ({ page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite }) => {
    const skip = (page - 1) * perPage;
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const filter = {};
    if (type) filter.contactType = type;
    if (typeof isFavourite !== 'undefined') filter.isFavourite = isFavourite === 'true';

    const totalItems = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter).sort(sort).skip(skip).limit(parseInt(perPage));

    return {
        data: contacts,
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        hasPreviousPage: page > 1,
        hasNextPage: page * perPage < totalItems,
    };
};

const getContactByIdService = async (contactId) => Contact.findById(contactId);

const createContactService = async (data) => Contact.create(data);

const updateContactService = async (contactId, data) => Contact.findByIdAndUpdate(contactId, data, { new: true });

const deleteContactService = async (contactId) => Contact.findByIdAndDelete(contactId);

module.exports = {
    getContactsService,
    getContactByIdService,
    createContactService,
    updateContactService,
    deleteContactService,
};
