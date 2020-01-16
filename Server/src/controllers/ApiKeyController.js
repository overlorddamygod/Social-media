const {ApiKey} = require('../models')

module.exports = {
  async add (req, res) {
    try {
        const Apikey = await ApiKey.create(req.body);
        res.send({
            api:Apikey.toJSON()
        })
    } catch (err) {
        res.status(400).send({
        error: 'Not generated'
        })
    }
  }
}
