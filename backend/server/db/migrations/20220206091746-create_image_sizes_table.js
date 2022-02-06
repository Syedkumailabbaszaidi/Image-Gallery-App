'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_sizes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'images',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('image_sizes');
  },
};
