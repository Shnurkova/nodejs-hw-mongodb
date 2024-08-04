async function register(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  res.send('Register');
}

export { register };
