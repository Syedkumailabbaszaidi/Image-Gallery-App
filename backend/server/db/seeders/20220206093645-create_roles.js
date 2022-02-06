import { ROLES } from '../../constants/roles_constant';

const roles = [{ name: ROLES.USER }];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
