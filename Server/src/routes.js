const AuthenticationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const ApiKeyController = require('./controllers/ApiKeyController')
const UsersController = require('./controllers/UsersController')
const FriendsController = require('./controllers/FriendsController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApiKeyCheckPolicy = require('./policies/ApiKeyCheckPolicy')
const config = require('./config/config')


module.exports = (app) => {
  app.get('/user',
      UsersController.getinfo),
    app.get('/findfriends',
      FriendsController.findfriends),
    app.post('/friends/add',
      FriendsController.addfriend),
    app.get('/friends',
      FriendsController.myfriends),
    app.delete('/friends',
      FriendsController.removefriend),
    app.post('/register',
      // ApiKeyCheckPolicy.ApiKeyCheck,
      AuthenticationControllerPolicy.register,
      AuthenticationController.register)
  app.post('/login',
      // ApiKeyCheckPolicy.ApiKeyCheck,
      AuthenticationController.login),
    app.get('/friends/message',
      FriendsController.getMessage)
  app.get('/posts/',
      // ApiKeyCheckPolicy.ApiKeyCheck,
      PostsController.getpostsbyuser),
    app.get('/posts/dash',
      // ApiKeyCheckPolicy.ApiKeyCheck,
      PostsController.getallposts)
  app.post('/posts',
    // ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.addpost)
  app.post('/api_keygen',
    (req, res, next) => {
      if (req.query.user_id == config.apilogin.userID && req.query.secret_id == config.apilogin.secretID) {
        next()
      } else {
        res.send({
          message: "Permission denied"
        })
      }
    },
    ApiKeyController.add)
}