import createHttpError from 'http-errors';
import {
  getAllContactsService,
  getContactByIdService,
  createContact,
  deleteContact,
  changeContactFavoriteService,
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
  const { id } = req.params;

  try {
    const contact = await getContactByIdService(id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
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
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const deletedContact = await deleteContact(id);

  if (!deletedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
};

export const changeContactFavorite = async (req, res, next) => {
  const { id } = req.params;
  const favorite = req.body;

  try {
    console.log(
      `Received PATCH request to update favorite status for contactId: ${id}, favorite: ${favorite}`,
    );

    const updatedContact = await changeContactFavoriteService(id, favorite);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return next(createHttpError(400, 'Invalid contact ID'));
    }
    console.error('Error updating favorite status:', err);
    next(err);
  }
};
