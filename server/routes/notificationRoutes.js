const {
  addNewNotification,
  deleteNotification,
  getNotification,
} = require('../controllers/notificatin.controller')
const auth = require('../middleware/authMiddleware')
const express = require('express')
const app = express()

app.post('/', auth, addNewNotification)
app.get('/', auth, getNotification)
app.delete('/:notificationId', auth, deleteNotification)

module.exports = app
