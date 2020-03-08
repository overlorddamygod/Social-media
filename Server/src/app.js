const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {
  Messages
} = require('./models')
const {
  sequelize
} = require('./models')
app.use(cors())

const config = require('./config/config')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {
  getallusers
} = require('./socket-helpers/users')
// app.use(morgan('combined'))
dotenv.config('./env')
app.use(bodyParser.json())


require('./routes')(app)
let users = []

io.on('connection', (socket) => {
  console.log("connected", socket.id)

  socket.on('chat-connection', data => {
    var duplicateUser = false
    var duplicateSocket=false
    if (data.user != null) {
      users.forEach((user, i) => {
        if (user.id === data.user.id) {
          users[i].socketids.forEach(u => {
            if (socket.id === u) duplicateSocket = true;
          })
          if (!duplicateSocket) {
            users[i].socketids.push(socket.id)
          }
          duplicateUser = true
        }
      })
      if (!duplicateUser) {
        data.user.socketids=[]
        data.user.socketids.push(socket.id)
        users.push(data.user)        
      }
    }
    // console.log(users);

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
    users.forEach(user => {
      if (user.id === data.sender) {
        user.socketids.forEach(socketid => {
          if (socketid != socket.id) {
            socket.broadcast.to(socketid).emit('message', {
              sender: data.sender,
              receiver: data.receiver,
              FriendId: data.friendid,
              message: data.message
            })
          }
        })
      }
      if (user.id === data.receiver) {
        user.socketids.forEach(socketid => {
            socket.broadcast.to(socketid).emit('message', {
              sender: data.sender,
              receiver: data.receiver,
              FriendId: data.friendid,
              message: data.message,
              sendername:data.sendername
            })
          })
      }
    })
  })

  socket.on('disconnect', function() {
    // console.log('Got disconnect!', socket.id);
    users.forEach((user, j) => {
      
      user.socketids.forEach((socketid,i) => {
        if (socketid===socket.id) users[j].socketids.splice(i,1)
      })
      if (users[j].socketids.length === 0) users.splice(j,1)
    })
    // console.log(users);
    
 });
});

sequelize.sync({
    force: false
  })
  .then(() => {
    server.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })