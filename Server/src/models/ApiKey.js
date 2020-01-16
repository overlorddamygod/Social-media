module.exports = (sequelize, DataTypes) => {
    const ApiKey = sequelize.define('ApiKey', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      name: DataTypes.STRING,
      useFor:DataTypes.STRING,
      createdAt: {
      type: 'TIMESTAMP',
      allowNull: false
        },
    updatedAt: {
      type: 'TIMESTAMP',
      allowNull: false
    }
    })
    return ApiKey
  }
  