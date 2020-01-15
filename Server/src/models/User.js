const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }
  var hash = bcrypt.hashSync(user.password);

  return user.setDataValue('password', hash)

}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  })

  User.prototype.comparePassword = function (password) {
    console.log(bcrypt.compareSync(password, this.password))
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
