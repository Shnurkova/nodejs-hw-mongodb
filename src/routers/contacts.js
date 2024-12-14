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
import { auth } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', auth, ctrlWrapper(getAllContacts));
router.get('/:contactId', auth, isValidId, ctrlWrapper(getContactById));

router.post(
  '/',
  auth,
  upload.single('photo'),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createUser),
);

router.delete('/:contactId', auth, isValidId, ctrlWrapper(deleteUser));

router.patch(
  '/:contactId',
  auth,
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(changeContactFavorite),
);

export default router;
