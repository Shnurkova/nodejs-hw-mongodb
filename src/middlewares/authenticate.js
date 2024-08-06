import createHttpError from 'http-errors';
import { Session } from '../db/Session.js';

export async function auth(req, res, next) {
  if (typeof req.headers.authorization !== 'string') {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = req.headers.authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }
  next();
}
