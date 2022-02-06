import jwt from 'jsonwebtoken';
import { encryptData } from '../utils/helper';
import {
  AUTH_MESSAGES,
  ACCESS_TOKEN_EXPIRED,
  UNAUTHORIZED_USER,
  INVALID_TOKEN,
} from '../../constants/messages';
import AuthenticationTokenRepo from '../../db/repositories/authentication_token';
import UserRepo from '../../db/repositories/user';
import { errorResponseNormalizer } from '../normalizers/response';
import { statusCodes } from '../utils/constants';
import ENV from '../../config/env';

export const generateToken = (claims, expire) => {
  const token = jwt.sign(
    {
      id: claims.id,
      name: claims.name,
      email: encryptData(claims.email),
      expire,
    },
    ENV.SECRET_KEY,
  );
  return {
    token,
    expireAt: expire,
  };
};

export const authenticateUser = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    const errRes = errorResponseNormalizer(UNAUTHORIZED_USER);
    return res.status(statusCodes.UN_AUTHORIZED).json(errRes);
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const tokenClaims = jwt.verify(token, ENV.SECRET_KEY);
    if (tokenClaims.expire <= Date.now()) {
      await AuthenticationTokenRepo.removeToken({ value: token });
      const errRes = errorResponseNormalizer(ACCESS_TOKEN_EXPIRED);
      return res.status(statusCodes.UN_AUTHORIZED).json(errRes);
    }

    const user = await UserRepo.fetchUser({ id: tokenClaims.id });
    if (!user) {
      const errRes = errorResponseNormalizer(AUTH_MESSAGES.USER_NOT_FOUND);
      return res.status(statusCodes.BAD_REQUEST).json(errRes);
    }
    const authToken = await AuthenticationTokenRepo.fetchToken({
      value: token,
      userId: tokenClaims.id,
    });
    if (!authToken || (authToken && authToken.userId.toString() !== user.id.toString())) {
      const errRes = errorResponseNormalizer(INVALID_TOKEN);
      return res.status(statusCodes.UN_AUTHORIZED).json(errRes);
    }
    req.user = user;
    req.tokenClaims = tokenClaims;
    req.token = token;
    next();
    return '';
  } catch (err) {
    const errRes = errorResponseNormalizer(err);
    return res.status(statusCodes.UN_AUTHORIZED).json(errRes);
  }
};
