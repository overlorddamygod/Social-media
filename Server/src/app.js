const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {
  Messages
} = require('./models')
const {
  sequelize
} = require('./models')
const config = require('./config/config')

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {
  getallusers
} = require('./socket-helpers/users')
// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

let users = []

io.on('connection', (socket) => {
  console.log("connected", socket.id)

  socket.on('chat-connection', data => {
    // console.log(data)
    var duplicate = false
    if (data.user != null) {



      users.forEach((user, i) => {
        if (user.id === data.user.id) {
          users[i].socketid = socket.id
          duplicate = true
        }
      })
      if (!duplicate) {
        data.user.socketid = socket.id
        users.push(data.user)
      }
    }

    console.log(users);

  })
  socket.on('sendmessage', async (data) => {
    // console.log(data)
    if (data.sender != null && data.receiver != null) {
      const message = await Messages.create({
        sender: data.sender,
        receiver: data.receiver,
        FriendId: data.friendid,
        message: data.message
      });
    }
    // console.log(usersJson);

    var sent1 = false
    // console.log(data)
    users.forEach(user => {
      if (user.id === data.receiver) {
        if (!sent1) {
          socket.broadcast.to(user.socketid).emit('message', {
            sender: data.sender,
            receiver: data.receiver,
            FriendId: data.friendid,
            message: data.message
          })
          sent1 = true
        }
      }
    })
  })
});

sequelize.sync({
    force: false
  })
  .then(() => {
    server.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })