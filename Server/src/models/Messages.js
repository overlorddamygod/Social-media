module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        sender: DataTypes.STRING,
        receiver: DataTypes.STRING,
        message: DataTypes.TEXT,
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
    Messages.associate = function (models) {
        Messages.belongsTo(models.Friends)
    }
    return Messages
}