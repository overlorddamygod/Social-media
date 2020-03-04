const path = require('path')

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: 'sql12325524' || 'social-media',
    user: 'sql12325524' || 'overlord',
    password: 'KCrGGAm2tH' || 'naruto77',
    options: {
      dialect: 'mysql' || 'sqlite',
      host: 'sql12.freemysqlhosting.net' || 'localhost',
      storage: path.resolve(__dirname, '../../social-media.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  apilogin: {
    userID: "e6eb38b1-237e-4559-bc4a-379bcb84f887",
    secretID: "1cfb0de4-9945-4442-afef-b674204c0267"
  }

}