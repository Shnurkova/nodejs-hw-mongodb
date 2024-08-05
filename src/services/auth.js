import bcrypt from 'bcrypt';
import User from '../db/User.js';
import createHttpError from 'http-errors';

export const registerUser = async (user) => {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
};

export const loginUser = async (email, password) => {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(401, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, maybeUser.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorize');
  }
};
