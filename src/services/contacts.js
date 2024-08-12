import Contact from '../db/Contact.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find({ userId });

  // contactQuery.where('userID').equals(userId);

  const [contacts, count] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    Contact.countDocuments({ userId }),
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
export const getContactByIdService = (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};
export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const deleteContact = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};

export const changeContactFavoriteService = async (
  contactId,
  userId,
  updatedData,
) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (err) {
    console.error('Error updating favorite status in service:', err);
    throw err;
  }
};
