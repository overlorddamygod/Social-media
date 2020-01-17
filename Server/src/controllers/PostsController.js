const {Posts,Likes} = require('../models')

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
        let postJson = []
        const posts = await Posts.findAll();
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
