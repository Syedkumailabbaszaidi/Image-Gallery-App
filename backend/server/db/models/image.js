const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.hasMany(models.ImageSize, {
        foreignKey: 'imageId',
        as: 'sizes',
      });
      Image.hasMany(models.SharedImage, {
        foreignKey: 'imageId',
        as: 'shared',
      });
      Image.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      timestamps: false,
    },
  );
  return Image;
};
