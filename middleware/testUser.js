const { BadRequest } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequest('Test User. Read Only!');
  next();
};

module.exports = testUser;
