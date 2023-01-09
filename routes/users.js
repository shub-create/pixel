const express = require('express');

const router = express.Router();

const users = require('../controllers/users');

router.post('/login', users.createUser);

router.post('/user',users.getUserById);

module.exports = router;