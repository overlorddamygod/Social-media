'use strict';
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const basename  = path.basename(__filename)
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)
// const model = sequelize.import(path.join(__dirname, 'User'))
// db.User=model
// const model1 = sequelize.import(path.join(__dirname, 'Posts'))
// db.Posts=model1

const f=fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
 f.forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file));
  const name =file.slice(0,-3)
  db[name] = model;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db