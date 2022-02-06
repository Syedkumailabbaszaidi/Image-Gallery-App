import AuthController from './controller';
import AuthValidation from './validator';
import * as middleware from '../../shared/middlewares/authentication';
import APIValidator from '../../shared/validators/api';

const express = require('express');

const router = express.Router();

router.post('/register', APIValidator(AuthValidation('register')), AuthController.registerUser);
router.post('/login', APIValidator(AuthValidation('login')), AuthController.loginUser);
router.get('/logout', middleware.authenticateUser, AuthController.logoutUser);

export default router;
