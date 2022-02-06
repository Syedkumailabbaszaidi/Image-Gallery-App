const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.hasMany(models.ImageSize, {
        foreignKey: 'imageId',
      });
      Image.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Image.init(
    {
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
      modelName: 'Image',
      tableName: 'images',
    },
  );
  return Image;
};
