const {User} = require('../models')
const config = require('../config/config')
const uid= require('uuid')


module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      console.log(req.body)
      const userJson = user.toJSON()
      res.send(user.toJSON())  
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  }
}