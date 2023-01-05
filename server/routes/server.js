const express = require('express')
const cors = require('cors')
const app = express()
const cookieSession = require('cookie-session')
const oauth2 = require('./routes/oauth2')
const passport = require('passport')
require('../passport')
require('./config/mongoose.config')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cookieSession({
    name: 'session',
    keys: ['mob'],
    maxAge: 24 * 60 * 60 * 100,
    // maxAge: 5,
  })
)
const postRouter = require('./routes/posts.routs')

const appRouter = require('./routes/app.routs')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')
const notificationRouter = require('./routes/notificationRoutes')
const groupRouter = require('./routes/group.routs')
const { errorHandler, routeNotFound } = require('./middleware/errorMiddleware')
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/chats', chatRouter)
app.use('/api/users', appRouter)
app.use('/api/message', messageRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/group', groupRouter)
app.use('/auth', oauth2)
app.use('/api/post', postRouter)
// const cookieparser = require("cookie-parser");
// app.use(cookieparser());

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`)
})

app.use(routeNotFound)
app.use(errorHandler)
// Chat App
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('Sockets are in action')
  socket.on('setup', (userData) => {
    socket.join(userData._id)
    console.log(userData.name, 'connected')
    socket.emit('connected')
  })
  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User joined room: ' + room)
  })
  socket.on('new message', (newMessage) => {
    var chat = newMessage.chatId
    console.log(chat)
    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return
      socket.in(user._id).emit('message received', newMessage)
    })
    socket.on('typing', (room) => {
      socket.in(room).emit('typing')
    })
    socket.on('stop typing', (room) => {
      socket.in(room).emit('stop typing')
    })
  })
  socket.off('setup', () => {
    console.log('USER DISCONNECTED')
    socket.leave(userData._id)
  })
})
