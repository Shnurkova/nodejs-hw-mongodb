import createHttpError from 'http-errors';
import {
  getAllContactsService,
  getContactByIdService,
  createContact,
} from '../services/contacts.js';

export const getAllContacts = async (req, res) => {

  const contacts = await getAllContactsService();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactById = async (req, res, next) => {

  const { contactId } = req.params;

  try {

    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return next(createHttpError(404, "Contact not found"));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return next(createHttpError(400, 'Contact not found'));
    }
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType
  };

  const result = await createContact(contact);

  console.log({ result });

  res.send("OK");
 };

