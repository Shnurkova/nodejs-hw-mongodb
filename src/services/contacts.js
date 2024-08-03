import Contact from '../db/Contact.js';

export const getAllContactsService = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [contacts, count] = await Promise.all([
    Contact.find().skip(skip).limit(limit).exec(),
    Contact.countDocuments(),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
};
export const getContactByIdService = (contactId) => Contact.findById(contactId);

export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

export const changeContactFavoriteService = async (contactId, favorite) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, favorite, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    console.error('Error updating favorite status in service:', err);
    throw err;
  }
};
