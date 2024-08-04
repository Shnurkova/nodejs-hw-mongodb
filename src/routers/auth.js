import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register } from '../controllers/auth.js';

const routerAuth = express.Router();
const jsonParser = express.json();

routerAuth.post('/auth/register', jsonParser, ctrlWrapper(register));

export default routerAuth;
