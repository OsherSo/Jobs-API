const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequest } = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequest('Please provide all values');

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name }, token });
};

const login = async (req, res) => {
  res.send('login');
};

module.exports = {
  register,
  login,
};
