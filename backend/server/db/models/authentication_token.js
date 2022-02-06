const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticationToken extends Model {
    static associate(models) {
      AuthenticationToken.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.User.hasMany(AuthenticationToken, {
        foreignKey: 'userId',
      });
    }
  }
  AuthenticationToken.init(
    {
      value: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
        },
        onDelete: 'CASCADE',
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'AuthenticationToken',
      tableName: 'authentication_tokens',
    },
  );
  return AuthenticationToken;
};
