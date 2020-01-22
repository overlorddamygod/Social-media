const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

io.on('connection', (socket) => { 
  console.log("connected")
  socket.on('sendmessage',(msg) => {
      console.log(msg)
      io.emit('sendmessage',msg)
  })
});

sequelize.sync({force: false})
  .then(() => {
    server.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
