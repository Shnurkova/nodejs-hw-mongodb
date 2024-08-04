import { createUser } from '../services/auth.js';

async function register(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const createdUser = await createUser(user);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: createdUser,
  });
}

export { register };
