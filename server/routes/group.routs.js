const GroupController = require('../controllers/group.controller')
// const { checkAuth } = require("../config/checkAuth.js");

const express = require('express')
const app = express()
app.get('/', GroupController.getAllGroup)
app.post('/new', GroupController.createGroup)
app.get('/:id', GroupController.getGroup)

app.get('/api/group/:cat/', GroupController.findGroupByCategory)

app.get('/:id/posts', GroupController.findPostsByGroup)

app.put('/:id/edit', GroupController.updateGroup)

app.delete('/:id/delete', GroupController.deleteGroup)

module.exports = app
