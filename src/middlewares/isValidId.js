import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  console.log(contactId);

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }
  next();
};
