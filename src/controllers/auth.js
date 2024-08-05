import { registerUser, loginUser } from '../services/auth.js';

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

  // res.status(201).send({
  //   status: 201,
  //   message: 'Successfully registered a user!',
  //   data: registeredUser,
  // });
  res.send('Login oh yes');
}

export { register, login };
