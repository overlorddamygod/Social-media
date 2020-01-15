module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      photoUrl: DataTypes.STRING,
      content:DataTypes.TEXT,
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
    Posts.associate = function (models) {
      Posts.belongsTo(models.User)
    }
    return Posts
  }
  