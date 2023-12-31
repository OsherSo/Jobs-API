const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequest, UnAuthorized } = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name,
      lastName: user.lastName,
      email,
      location: user.location,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest('Please provide email and password');

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new UnAuthorized('Invalid Credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.user.userId;
  const { name, lastName, email, location } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      name,
      lastName,
      email,
      location,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name,
      lastName,
      email,
      location,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
