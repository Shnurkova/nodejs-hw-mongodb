import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import {
  getAllContactsService,
  getContactByIdService,
  createContact,
  deleteContact,
  changeContactFavoriteService,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactByIdService(contactId, req.user._id);

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

export const createUser = async (req, res) => {
  let photoUrl = '';

  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo: photoUrl,
  };

  const createdContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const deleteUser = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId, req.user._id);

  if (!deletedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
};

export const changeContactFavorite = async (req, res, next) => {
  let photoUrl = '';
  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }
  const { contactId } = req.params;
  const updatedData = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };
  try {
    const updatedContact = await changeContactFavoriteService(
      contactId,
      req.user._id,
      updatedData,
    );

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
    console.error('Error updating status:', err);
    next(err);
  }
};
