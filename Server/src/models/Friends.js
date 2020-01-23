module.exports = (sequelize, DataTypes) => {
    const Friends = sequelize.define('Friends', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      friend1:{
        type: DataTypes.UUID,
      },
      friend1name:{
        type: DataTypes.STRING,
      },
      friend2: {
        type: DataTypes.UUID,
      },
      friend2name:{
        type: DataTypes.STRING,
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
    return Friends
  }
  