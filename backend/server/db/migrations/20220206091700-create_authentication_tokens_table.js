'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authentication_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.STRING(1000),
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
        },
      },
      expireAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('authentication_tokens');
  },
};
