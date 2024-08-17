import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  sendResetPassword,
} from '../services/auth.js';

async function register(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(user);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  console.log({ session });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function logout(req, res, next) {
  if (typeof req.cookies.sessionId === 'string') {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
}

async function refresh(req, res) {
  const session = await refreshUserSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function sendResetEmail(req, res) {
  await requestResetEmail(req.body.email);
  res.send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

async function resetPassword(req, res, next) {
  const { email, token } = req.body;

  console.log('Received reset password request for email:', email);
  console.log('Received token for reset password:', token);

  await sendResetPassword(email, token);

  res.send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
}

export { register, login, logout, refresh, sendResetEmail, resetPassword };
