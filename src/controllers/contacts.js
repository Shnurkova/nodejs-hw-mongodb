import { getAllContactsServices } from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await getAllContactsServices;
        res.status(200).json({
            message: "Successfully found contact with id {**contactId**}!",
            data: contacts,
            status: 200,
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};
