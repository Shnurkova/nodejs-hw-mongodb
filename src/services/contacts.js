import Contact from '../db/Contact.js';

export const getAllContactsService = () => Contact.find();

export const getContactByIdService = (contactId) =>
  Contact.findById(contactId);

export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};


export const changeContactFavorite = async (contactId, favorite) => {
  return Contact.findByIdAndUpdate(contactId, { favorite: favorite }), {new: true};
};
