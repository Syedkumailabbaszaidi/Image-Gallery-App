import jwt from 'jsonwebtoken';
import { encryptData } from '../utils/helper';
import {
  ACCESS_TOKEN_EXPIRED,
  USER_NOT_FOUND,
  UNAUTHORIZED_USER,
  INVALID_TOKEN,
  ADMIN_NOT_FOUND,
} from '../../constants/messages';
import AuthenticationTokenRepo from '../../db/repositories/authentication_token';
import RoleRepo from '../../db/repositories/role';
import UserRepo from '../../db/repositories/user';
import UserRoleRepo from '../../db/repositories/user_role';
import { errorResponseNormalizer } from '../normalizers/response';
import { statusCodes } from '../utils/constants';
import ENV from '../../config/env';
import { ROLES } from '../../constants/roles_constant';

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
      const errRes = errorResponseNormalizer(USER_NOT_FOUND);
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

export async function authenticateAdmin(req, res, next) {
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

    const adminRole = await RoleRepo.fetchRole({ name: ROLES.ADMIN });

    const userRole = await UserRoleRepo.fetchUserRole({ userId: tokenClaims.id });

    if (!userRole || userRole.roleId !== adminRole.id) {
      return res.status(statusCodes.NOT_FOUND).json({
        error_message: ADMIN_NOT_FOUND,
        error: ADMIN_NOT_FOUND,
      });
    }

    // check if token exist and token userid and is same fetch user id is same
    const user = await UserRepo.fetchUser({ id: tokenClaims.id });

    if (!user) {
      const errRes = errorResponseNormalizer(USER_NOT_FOUND);
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
}
