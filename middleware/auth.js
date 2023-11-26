const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../errors');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnAuthorized('No token provided');

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnAuthorized('No token provided');
  }
};

module.exports = auth;
