const postController = require('../controllers/post.controller')
// const { checkAuth } = require("../config/checkAuth.js");
const express = require('express')
const app = express()
app.get('/api/post', postController.getAllPosts)
app.get('/api/comm', postController.getAllComm)

// find comments by a post
app.get('/api/post/:id/comm', postController.findCommentsByPost)

//create
app.post('/api/post/new', postController.createPosts)
app.post('/api/comm/new', postController.createComment)
//retrive by id
app.get('/api/post/:id', postController.getPost)
app.get('/api/comm/:id', postController.getComment)
// edit by id
app.put('/api/post/:id/edit', postController.updatePosts)
app.put('/api/post/:id/edit', postController.updateComment)
//
app.delete('/api/post/:id/delete', postController.deletePosts)
app.delete('/api/comm/:id/delete', postController.deleteComment)

module.exports = app
