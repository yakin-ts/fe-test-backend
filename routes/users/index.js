const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users');

router.get('/', usersController.getAllUsers);


module.exports = router;
