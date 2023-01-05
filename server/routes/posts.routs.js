const postController = require('../controllers/post.controller')
// const { checkAuth } = require("../config/checkAuth.js");
const express = require('express')
const app = express()
app.get('/post', postController.getAllPosts)
app.get('/comm', postController.getAllComm)
app.get('/three', postController.getThree)

// find comments by a post
app.get('/post/:id/comm', postController.findCommentsByPost)

//create
app.post('/new', postController.createPosts)
app.post('/comm/new', postController.createComment)
//retrive by id
app.get('/post/:id', postController.getPost)
app.get('/comm/:id', postController.getComment)
// edit by id
app.put('/post/:id/edit', postController.updatePosts)
app.put('/post/:id/edit', postController.updateComment)
//
app.delete('/:id/delete', postController.deletePosts)
app.delete('/comm/:id/delete', postController.deleteComment)

module.exports = app
