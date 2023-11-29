const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../errors');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnAuthorized('No token provided');

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === '65672b7f8587c81058025e95';
    req.user = {
      userId: payload.userId,
      testUser,
    };
    next();
  } catch (error) {
    throw new UnAuthorized('No token provided');
  }
};

module.exports = auth;
