import models from '../models/index';
import Repository from './index';

class RoleRepo extends Repository {
  constructor(role) {
    super(role);
  }

  async fetchRole(params, options = {}, includes = null) {
    const attributes = ['id'];
    return this.findRecord(params, attributes, includes, options);
  }
}
module.exports = new RoleRepo(models.Role);
