import Contact from '../db/Contact.js';

export const getAllContactsService = () => Contact.find();

export const getContactByIdService = (contactId) =>
  Contact.findById(contactId);

export const createContact = (contact) => {
  Contact.create(contact);
};
