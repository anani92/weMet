const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require('../controllers/chatControllers')
const express = require('express')
const app = express()

const auth = require('../middleware/authMiddleware')

app.post('/', auth, accessChat)
app.get('/', auth, fetchChats)
app.route('/group').post(auth, createGroupChat)

app.route('/grouprename').put(auth, renameGroup)

app.route('/groupremove').put(auth, removeFromGroup)

app.route('/groupadd').put(auth, addToGroup)
module.exports = app
