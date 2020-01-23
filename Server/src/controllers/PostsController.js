const {Posts,Likes,Friends,User} = require('../models')
const { Op } = require("sequelize");


module.exports = {
  async getpostsbyuser (req, res) {
    try {
        let postJson = []
        const posts = await Posts.findAll({
        where: {
          userId:req.query.user_id
            }
        });
        posts.forEach(element => {
            postJson.push(element.dataValues)
        });
        res.send({
            posts:postJson,
        })
    } catch (err) {
        res.status(400).send({
        error: 'Not found'
        })
    }
  },
  async getallposts (req, res) {
    try {
      let friendsJson=[]
      const friends = await Friends.findAll({
        where: {
          [Op.or]: [{ friend1: req.query.user_id }, { friend2: req.query.user_id }],             // (a = 5) OR (b = 6)
        }
      })  
      friends.forEach(element => {
        if (element.dataValues.friend1===req.query.user_id)
        {
          friendsJson.push({
            id:element.dataValues.id,
            friendid:element.dataValues.friend2,
            friendname:element.dataValues.friend2name,
            createdAt:element.dataValues.createdAt,
            updatedAt:element.dataValues.updatedAt,
          })
        } else {
          friendsJson.push({
            id:element.dataValues.id,
            friendid:element.dataValues.friend1,
            friendname:element.dataValues.friend1name,
            createdAt:element.dataValues.createdAt,
            updatedAt:element.dataValues.updatedAt,
          })
        }

          });
          let usersJson = []
          friendsJson.forEach(element=> {
            usersJson.push(element.friendid)
          })
          const allposts = await Posts.findAll({
            where: {
              UserId:usersJson
            }
          })
        res.send({
            posts:allposts
        })
    } catch (err) {
        res.status(400).send({
        error: 'Not founda'
        })
    }
  },
  async addpost (req, res) {
    try {
      const posts = await Posts.create(req.body);
      const postJson = posts.toJSON()
      res.send({
        posts:postJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'Not got'
      })
    }
  }
}
