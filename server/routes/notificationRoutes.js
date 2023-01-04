const {
  addNewNotification,
  deleteNotification,
  getNotification,
} = require('../controllers/notificatin.controller')
const express = require('express')
const app = express()

app.post('/', addNewNotification)
app.get('/', getNotification)
app.delete('/:notificationId', deleteNotification)

module.exports = app
