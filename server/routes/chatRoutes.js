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

app.post('/', accessChat)
app.get('/', fetchChats)
app.post('/group', createGroupChat)

app.put('/grouprename', renameGroup)

app.put('/groupremove', removeFromGroup)

app.put('/groupadd', addToGroup)
module.exports = app
