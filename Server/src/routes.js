const AuthenticationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const ApiKeyController = require('./controllers/ApiKeyController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ApiKeyCheckPolicy = require('./policies/ApiKeyCheckPolicy')


module.exports = (app) => {
  app.post('/register',
  ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
  ApiKeyCheckPolicy.ApiKeyCheck,
    AuthenticationController.login)
  app.get('/posts/',
  ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.getpostsbyuser)
  app.post('/posts',
  ApiKeyCheckPolicy.ApiKeyCheck,
    PostsController.addpost)
  app.post('/api_keygen',
    ApiKeyController.add)
}