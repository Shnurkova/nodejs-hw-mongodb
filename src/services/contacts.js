import Contact from '../db/Contact.js';

export const getAllContactsServices = () => Contact.find();
