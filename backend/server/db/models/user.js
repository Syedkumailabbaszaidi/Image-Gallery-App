const { Model } = require('sequelize');
import { generateSalt, generateHashUsingSalt } from '../../shared/utils/encryption';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserRole, {
        foreignKey: 'userId',
        as: 'userRole',
      });

      User.hasMany(models.Image, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue('password');
        },
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue('salt');
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  );

  User.generateSalt = function () {
    return generateSalt();
  };

  User.encryptPassword = function (plainText, salt) {
    return generateHashUsingSalt(plainText, salt);
  };

  User.validPassword = function (user, enteredPassword) {
    return User.encryptPassword(enteredPassword, user.salt()) === user.password();
  };

  const setSaltAndPassword = (user) => {
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };

  User.beforeCreate(setSaltAndPassword);

  User.beforeUpdate(setSaltAndPassword);

  return User;
};
