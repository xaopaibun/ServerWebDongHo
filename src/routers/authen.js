const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/signup', UserController.signup)
router.post('/loginAdmin', UserController.loginAdmin)
router.post('/google', passport.authenticate('google-plus-token', { session: false}), UserController.authenGoogle);
router.post('/facebook', passport.authenticate('facebook-token', { session: false}), UserController.authenFacebook);

module.exports = router;