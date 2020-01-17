const {User} = require('../models')

module.exports = {
  async getinfo (req, res) {
    try {
        const user = await User.findOne({
        where: {
          id:req.query.user_id
        }
        });
        res.send({
            user:user.toJSON()
        })
    } catch (err) {
        res.status(400).send({
        error: 'Not found'
        })
    }
  }
}