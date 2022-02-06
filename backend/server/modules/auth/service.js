import models from '../../db/models';
import UserRepo from '../../db/repositories/user';
import RoleRepo from '../../db/repositories/role';
import UserRoleRepo from '../../db/repositories/user_role';
import AuthenticationTokenRepo from '../../db/repositories/authentication_token';
import * as authentication from '../../shared/middlewares/authentication';
import { AUTH_MESSAGES } from '../../constants/messages';
import { ROLES } from '../../constants/roles_constant';

export const fetchUser = async (filter, options = {}) => {
  return UserRepo.fetchUser(filter, options);
};

export const userLogin = async ({ email, password }) => {
  try {
    const dbUser = await UserRepo.fetchUserWithRole({ email });

    if (!dbUser) {
      throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    let user = await userLoginHandler(dbUser, password);
    return user;
  } catch (err) {
    throw err;
  }
};

export const userLoginHandler = async (dbUser, password) => {
  try {
    if (password) {
      const validPassword = models.User.validPassword(dbUser, password);
      if (!validPassword) {
        throw new Error(AUTH_MESSAGES.INCORRECT_PASSWORD);
      }
    }

    const token = await generateTokenAndUpdateDB(dbUser);

    let user = { ...dbUser.dataValues };

    return { user, token };
  } catch (err) {
    throw err;
  }
};

export const createUser = async (user) => {
  return models.sequelize.transaction(async (transaction) => {
    const createdUser = await UserRepo.createUser({
      ...user,
    });

    const dbUser = await fetchUser({ id: createdUser.id }, { transaction });

    const roles = await RoleRepo.fetchRole({ name: ROLES.USER });

    await UserRoleRepo.createUserRole({
      roleId: roles.id,
      userId: createdUser.id,
    });

    const token = await generateTokenAndUpdateDB(dbUser);

    return {
      user: dbUser,
      token,
    };
  });
};

export const generateTokenAndUpdateDB = async (dbUser, options = {}) => {
  try {
    const expire = Date.now() + 86400000; // next 24 hours
    const { token, expireAt } = authentication.generateToken(
      {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        dob: dbUser.dob,
      },
      expire,
    );
    await AuthenticationTokenRepo.createAuthenticationToken(
      {
        userId: dbUser.id,
        value: token,
        expireAt: expireAt,
      },
      options,
    );
    return token;
  } catch (err) {
    throw err;
  }
};

export const removeToken = async (value) => {
  await AuthenticationTokenRepo.removeToken({ value });
  return true;
};

export default {
  fetchUser,
  userLogin,
  userLoginHandler,
  createUser,
  generateTokenAndUpdateDB,
  removeToken,
};
