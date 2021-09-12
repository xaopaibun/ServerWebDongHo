const express = require('express')
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/signup', UserController.signup)
router.post('/loginAdmin', UserController.loginAdmin)

module.exports = router;