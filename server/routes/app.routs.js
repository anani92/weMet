const appController = require('../controllers/app.controler')

const express = require('express')
const app = express()
app.post('/signup', appController.createUser)
app.post('/login', appController.loginUser)
app.get('/users', appController.allUsers)

module.exports = app
