const {
  sendMessage,
  fetchMessage,
} = require('../controllers/messageControllers')
const express = require('express')
const app = express()
app.post('/', sendMessage)
app.get('/:chatId', fetchMessage)

module.exports = app
