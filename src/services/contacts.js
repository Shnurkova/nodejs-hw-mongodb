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


export const changeContactFavoriteService = async (contactId, favorite) => {

  try {
    console.log(`Updating favorite status for contactId: ${contactId} to ${favorite}`);

    return await Contact.findByIdAndUpdate(contactId, { isFavorite: favorite }), {new: true, runValidators: true};

  } catch (err) {
    console.error('Error updating favorite status in service:', err);
    throw err;
  }
};
