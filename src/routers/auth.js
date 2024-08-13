import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  register,
  login,
  logout,
  refresh,
  sendResetEmail,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';

const routerAuth = express.Router();
const jsonParser = express.json();

routerAuth.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

routerAuth.post(
  '/auth/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(login),
);

routerAuth.post('/auth/logout', ctrlWrapper(logout));

routerAuth.post('/auth/refresh', ctrlWrapper(refresh));

routerAuth.post(
  '/auth/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);

export default routerAuth;
