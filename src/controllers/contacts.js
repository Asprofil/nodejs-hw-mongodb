const cloudinary = require('cloudinary').v2;
const Contact = require('../models/contact');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhoto = async (req, res, next) => {
  try {
    const { path } = req.file;

    const result = await cloudinary.uploader.upload(path);
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      photo: result.secure_url,
    });

    await newContact.save();
    res.status(201).json({ status: 201, message: 'Contact created successfully', data: newContact });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { path } = req.file;

    const result = await cloudinary.uploader.upload(path);
    const updatedContact = await Contact.findByIdAndUpdate(contactId, {
      ...req.body,
      photo: result.secure_url,
    }, { new: true });

    res.status(200).json({ status: 200, message: 'Contact updated successfully', data: updatedContact });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadPhoto, updateContact };
