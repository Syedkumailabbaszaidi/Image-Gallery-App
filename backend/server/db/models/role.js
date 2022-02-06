const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {}
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    },
  );
  return Role;
};
