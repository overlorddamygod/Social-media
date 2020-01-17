const AuthenticationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const ApiKeyController = require('./controllers/ApiKeyController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApiKeyCheckPolicy = require('./policies/ApiKeyCheckPolicy')
const config = require('./config/config')


module.exports = (app) => {
  app.post('/register',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationController.login)
  app.get('/posts/',
  // ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.getpostsbyuser)
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