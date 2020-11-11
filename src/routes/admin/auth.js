const express = require('express');
const { requireSingin } = require('../../common-middleware');
const { signup, signin, singout } = require('../../controller/admin/auth');
const { validateSignupRequest , isRequestValidated, validateSigninRequest } = require('../../validation/auth');
const router = express.Router();


router.post('/admin/signup',validateSignupRequest ,isRequestValidated, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValidated, signin)
router.post('/admin/signout', singout)


module.exports = router;