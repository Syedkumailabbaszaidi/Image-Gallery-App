import models from '../models';
import Repository from './index';

class AuthenticationTokenRepo extends Repository {
  constructor(model) {
    super(model);
  }

  fetchToken(params) {
    return this.findRecord(params, null, null);
  }

  upsertAuthenticationToken(values, options = {}) {
    return this.createOrUpdate(values, options);
  }

  removeToken(where) {
    return this.deleteRecord(where);
  }

  async createAuthenticationToken(payload, options = {}) {
    return this.createRecord(payload, options);
  }
}

module.exports = new AuthenticationTokenRepo(models.AuthenticationToken);
