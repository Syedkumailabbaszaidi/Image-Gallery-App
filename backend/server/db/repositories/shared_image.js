import models from '../models/index';
import Repository from './index';

class SharedImageRepo extends Repository {
  constructor(shared_image) {
    super(shared_image);
  }

  async findImagesForCurrentUser(where = {}, attributes = [], include = [], options = {}) {
    include = [
      {
        model: models.Image,
        as: 'image',
        include: [
          {
            model: models.ImageSize,
            as: 'sizes',
          },
        ],
      },

      ...include,
    ];

    return this.findAllRecords(where, attributes, include, options);
  }

  async createImage(payload, options = {}) {
    return this.createRecord(payload, options);
  }
}

export default new SharedImageRepo(models.SharedImage);
