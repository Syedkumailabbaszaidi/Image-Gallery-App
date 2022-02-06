import AuthService from './service';
import { normalizeLoggedInUser } from './normalizer';
import { statusCodes } from '../../shared/utils/constants';
import { AUTH_MESSAGES } from '../../constants/messages';
import {
  errorResponseNormalizer,
  successResponseNormalizer,
} from '../../shared/normalizers/response';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await AuthService.userLogin({ email, password });
    const normalizedUser = normalizeLoggedInUser(loggedInUser.user); // removed extra keys like userRole, password and salt
    loggedInUser.user = normalizedUser;
    const response = successResponseNormalizer(AUTH_MESSAGES.LOGIN_SUCCESSFUL, loggedInUser);
    res.json(response);
  } catch (err) {
    const response = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(response);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { token } = req;
    await AuthService.removeToken(token);
    const response = successResponseNormalizer(AUTH_MESSAGES.LOGOUT_SUCCESSFUL);
    res.json(response);
  } catch (err) {
    const response = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(response);
  }
};

const registerUser = async (req, res) => {
  try {
    req.body.email = req.body.email.toLowerCase();
    const user = await AuthService.createUser(req.body);
    const response = successResponseNormalizer(AUTH_MESSAGES.REGISTER_SUCCESSFUL, user);
    res.json(response);
  } catch (err) {
    const response = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(response);
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
};
