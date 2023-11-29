const express = require('express');

const auth = require('../middleware/auth');
const testUser = require('../middleware/testUser');
const apiLimiter = require('../middleware/apiLimiter');
const { register, login, updateUser } = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(auth, testUser, updateUser);

module.exports = router;
