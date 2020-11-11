const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest , isRequestValidated, validateSigninRequest } = require('../validation/auth');
const router = express.Router();


router.post('/signup',validateSignupRequest ,isRequestValidated, signup)
router.post('/signin',validateSigninRequest,isRequestValidated, signin)


module.exports = router;