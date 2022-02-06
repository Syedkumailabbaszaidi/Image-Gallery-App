import Sequelize from 'sequelize';
import models from '../models/index';
import Repository from './index';

class ImageRepo extends Repository {
  constructor(image) {
    super(image);
  }

  async fetchAllImagesAndCount(where = {}, attributes = [], include = [], options = {}) {
    attributes = ['id', 'userId', 'createdAt', ...attributes];

    include = [
      {
        model: models.ImageSize,
        as: 'sizes',
      },
    ];

    return this.findAndCountAllRecords(where, attributes, include, options);
  }

  // async fetchUser(_params, options = {}) {
  //   const params = { ..._params };
  //   if (params.email) {
  //     params.email = params.email.toLowerCase();
  //   }

  //   const includes = [];

  //   const attributes = ['id', 'email', 'password', 'salt', 'name', 'updatedAt', 'createdAt'];
  //   return this.findRecord(params, attributes, includes, options);
  // }

  // async fetchUserWithRole(_params, options = {}) {
  //   const params = { ..._params };
  //   if (params.email) {
  //     params.email = params.email.toLowerCase();
  //   }

  //   const includes = [
  //     {
  //       model: models.UserRole,
  //       attributes: ['id'],
  //       as: 'userRole',
  //     },
  //   ];

  //   const attributes = ['id', 'email', 'password', 'salt', 'name', 'updatedAt', 'createdAt'];
  //   return this.findRecord(params, attributes, includes, options);
  // }

  async createImage(payload, options = {}) {
    return this.createRecord(payload, options);
  }

  // async updateUser(where, values, options) {
  //   return this.updateRecord(where, values, options);
  // }

  // async deleteUser(where = {}, options = {}) {
  //   return this.deleteRecord(where, options);
  // }
}

export default new ImageRepo(models.Image);
