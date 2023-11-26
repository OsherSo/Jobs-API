const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequest } = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequest('Please provide all values');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login');
};

module.exports = {
  register,
  login,
};
