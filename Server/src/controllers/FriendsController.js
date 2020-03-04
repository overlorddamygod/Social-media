const {
  Friends,
  User,
  Messages
} = require('../models')
const {
  Op
} = require("sequelize");


module.exports = {
  async addfriend(req, res) {
    try {
      const f = await Friends.findOne({
        where: {
          [Op.or]: [{
              [Op.and]: [{
                  friend1: req.body.friend1
                },
                {
                  friend2: req.body.friend2
                },
                // { status: 'active' }
              ]
            },
            {
              [Op.and]: [{
                  friend1: req.body.friend2
                },
                {
                  friend2: req.body.friend1
                },
                // { status: 'active' }
              ]
            }
          ]
        }
      })
      console.log(f)
      if (f) {
        res.send({
          error: "Already Added"
        })
      } else {
        const friends = await Friends.create(req.body);
        res.send({
          friends: friends.toJSON()
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'Not added'
      })
    }
  },
  async myfriends(req, res) {
    try {
      let friendsJson = []
      const friends = await Friends.findAll({
        where: {
          [Op.or]: [{
            friend1: req.query.user_id
          }, {
            friend2: req.query.user_id
          }], // (a = 5) OR (b = 6)
        }
      })
      friends.forEach(element => {
        if (element.dataValues.friend1 === req.query.user_id) {
          friendsJson.push({
            id: element.dataValues.id,
            friendid: element.dataValues.friend2,
            friendname: element.dataValues.friend2name,
            createdAt: element.dataValues.createdAt,
            updatedAt: element.dataValues.updatedAt,
          })
        } else {
          friendsJson.push({
            id: element.dataValues.id,
            friendid: element.dataValues.friend1,
            friendname: element.dataValues.friend1name,
            createdAt: element.dataValues.createdAt,
            updatedAt: element.dataValues.updatedAt,
          })
        }

      });
      res.send({
        friends: friendsJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'No users'
      })
    }
  },
  async removefriend(req, res) {
    try {
      await Friends.destroy({
        where: {
          [Op.or]: [{
              friend1: req.query.friend_id
            },
            {
              friend2: req.query.friend_id
            },
          ]
        }
      });
    } catch (err) {
      res.send({
        message: "error"
      })
    }
  },
  async findfriends(req, res) {
    try {
      let friendsJson = []
      const friends = await Friends.findAll({
        where: {
          [Op.or]: [{
            friend1: req.query.user_id
          }, {
            friend2: req.query.user_id
          }],
        }
      })
      friends.forEach(element => {
        if (element.dataValues.friend1 === req.query.user_id) {
          friendsJson.push({
            id: element.dataValues.id,
            friendid: element.dataValues.friend2,
            friendname: element.dataValues.friend2name,
            createdAt: element.dataValues.createdAt,
            updatedAt: element.dataValues.updatedAt,
          })
        } else {
          friendsJson.push({
            id: element.dataValues.id,
            friendid: element.dataValues.friend1,
            friendname: element.dataValues.friend1name,
            createdAt: element.dataValues.createdAt,
            updatedAt: element.dataValues.updatedAt,
          })
        }

      });
      let usersJson = []
      friendsJson.forEach(element => {
        usersJson.push(element.friendid)
      })
      usersJson.push(req.query.user_id)
      const u = await User.findAll({
        where: {
          [Op.not]: [{
            id: usersJson
          }]

        }
      })

      res.send({
        findfriends: u
      })
    } catch (err) {
      res.status(400).send({
        error: 'No users'
      })
    }
  },
  async getMessage(req, res) {
    try {
      let messagesJson = []
      const messages = await Messages.findAll({
        order: [
          ['createdAt']
        ],
        where: {
          FriendId: req.query.friend_id
        }
      })
      messages.forEach(element => {
        messagesJson.push(element.dataValues)
      });
      res.send(messagesJson)
    } catch (err) {
      res.send(err)
    }
  }

}