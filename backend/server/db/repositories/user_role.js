import models from '../models/index';
import Repository from './index';

class UserRoleRepo extends Repository {
  constructor(userRole) {
    super(userRole);
  }

  async createUserRole(userRole, options = {}) {
    const payload = {
      roleId: userRole.roleId,
      userId: userRole.userId,
    };
    return this.createRecord(payload, options);
  }

  async fetchUserRole(params, options = {}) {
    const attributes = ['id', 'roleId', 'userId'];
    return this.findRecord(params, attributes, null, options);
  }

  findAllUserRoles(params) {
    const where = {
      ...params,
    };
    return this.findAllRecords(where);
  }
}

export default new UserRoleRepo(models.UserRole);
