import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContacts,
  getContactById,
  createUser,
  deleteUser,
  changeContactFavorite,
} from '../controllers/contacts.js';
import { contactSchema, updateContactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post(
  '/',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createUser),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteUser));

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(changeContactFavorite),
);

export default router;
