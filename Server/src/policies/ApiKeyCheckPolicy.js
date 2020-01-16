const {ApiKey} = require('../models')

module.exports = {
    async ApiKeyCheck (req, res, next) {
        const api = await ApiKey.findOne({
            where: {
              id : req.query.api_key
            }
          })
        if (api) {
            next()
        } else {
            res.send({
                message: "Permission Denied"
            })
        }
    }
  }