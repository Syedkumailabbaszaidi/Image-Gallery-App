const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageSize extends Model {
    static associate(models) {
      ImageSize.belongsTo(models.Image, {
        foreignKey: 'imageId',
      });
    }
  }
  ImageSize.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'images',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'ImageSize',
      tableName: 'image_sizes',
    },
  );
  return ImageSize;
};
