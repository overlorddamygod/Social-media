module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      count: {
          type:DataTypes.INTEGER,
          defaultValue:0
      },
      createdAt: {
      type: 'TIMESTAMP',
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
    })
  Likes.associate = function (models) {
      Likes.belongsTo(models.Posts)
    }
    return Likes
  }
  