const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedImage extends Model {
    static associate(models) {
      SharedImage.belongsTo(models.Image, {
        foreignKey: 'imageId',
        as: 'image'
      });
      SharedImage.belongsTo(models.User, {
        foreignKey: 'sharedWith',
        as: 'user',
      });
    }
  }
  SharedImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      sharedWith: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'SharedImage',
      tableName: 'shared_images',
      timestamps: false,
    },
  );
  return SharedImage;
};
