const AuthenticationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const ApiKeyController = require('./controllers/ApiKeyController')
const UsersController = require('./controllers/UsersController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApiKeyCheckPolicy = require('./policies/ApiKeyCheckPolicy')
const config = require('./config/config')


module.exports = (app) => {
  app.get('/user',
  UsersController.getinfo),
  app.post('/register',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationController.login)
  app.get('/posts/',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.getpostsbyuser),
    app.get('/posts/all',
    // ApiKeyCheckPolicy.ApiKeyCheck,
      PostsController.getallposts)
  app.post('/posts',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.addpost)
  app.post('/api_keygen',
  (req,res,next) => {
    if (req.query.user_id == config.apilogin.userID && req.query.secret_id == config.apilogin.secretID) {
      next()
    } else {
      res.send({
        message:"Permission denied"
      })
    }
  },
    ApiKeyController.add)
}