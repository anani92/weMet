const auth = require('../middleware/authMiddleware')
const {
  sendMessage,
  fetchMessage,
} = require('../controllers/messageControllers')
const express = require('express')
const app = express()
app.post('/', auth, sendMessage)
app.get('/:chatId', auth, fetchMessage)

module.exports = app
