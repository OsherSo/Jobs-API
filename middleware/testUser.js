const { BadRequest } = require('../errors');

const testUser = (req, res, next) => {
  console.log(req.user);
  if (req.user.testUser) throw new BadRequest('Test User. Read Only!');
  next();
};

module.exports = testUser;
