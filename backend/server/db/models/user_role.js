const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }
  }
  UserRole.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
    },
  );
  return UserRole;
};
