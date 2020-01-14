const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
var passwordHash = require('password-hash');
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))



function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
function hashpass(pass) {
  return bcrypt.hashSync(pass)
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create({
        email:req.body.email,
        password:hashpass(req.body.password)
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Server Error'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      // const isPasswordValid = await user.comparePassword(password)
      const isPasswordValid = bcrypt.compareSync(password,user.password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}