const express = require('express');

const auth = require('../middleware/auth');
const { register, login, updateUser } = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(auth, updateUser);

module.exports = router;
