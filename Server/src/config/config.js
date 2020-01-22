const path = require('path')

module.exports = {
  port: process.env.PORT || 3002,
  db: {
    database: process.env.DB_NAME || 'social-media',
    user: process.env.DB_USER || 'overlord',
    password: process.env.DB_PASS || 'naruto77',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../social-media.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  apilogin : {
    userID:"e6eb38b1-237e-4559-bc4a-379bcb84f887",
    secretID:"1cfb0de4-9945-4442-afef-b674204c0267"
  }

}