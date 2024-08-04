import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/auth.js';

const routerAuth = express.Router();
const jsonParser = express.json();

routerAuth.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

export default routerAuth;
