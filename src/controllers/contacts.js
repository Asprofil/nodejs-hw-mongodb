const Contact = require('../models/contact');

const getContacts = async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', isFavourite } = req.query;
        const skip = (page - 1) * perPage;

        const filter = {};
        if (isFavourite) filter.isFavourite = isFavourite === 'true';

        const contacts = await Contact.find(filter)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(Number(perPage));

        const totalItems = await Contact.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / perPage);

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: {
                data: contacts,
                page: Number(page),
                perPage: Number(perPage),
                totalItems,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages,
            },
        });
    } catch (error) {
        next(error);
    }
};

const createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ status: 201, message: 'Contact created', data: contact });
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ status: 200, message: 'Contact updated', data: contact });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findByIdAndDelete(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ status: 200, message: 'Contact deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getContacts, createContact, updateContact, deleteContact };
