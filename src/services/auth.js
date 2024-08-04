import bcrypt from 'bcrypt';
import User from '../db/User.js';
import createHttpError from 'http-errors';

export const createUser = async (user) => {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
};
