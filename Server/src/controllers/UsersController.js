const {User} = require('../models')
const { Op } = require("sequelize");


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
  },
  async getallusers(req,res) {
    try {
      console.log(req.query.user_id)
      let usersJson = []
        const users = await User.findAll({
          where: {
            id: {
              [Op.ne]:req.query.user_id
            }
          }
        });
        users.forEach(element => {
            usersJson.push(element.dataValues)
        });
        res.send({
            users:usersJson,
        })
    } catch(err) {
      res.status(400).send({
        error: 'No users'
        })
    }
  }
}