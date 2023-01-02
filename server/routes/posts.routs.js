const postController = require("../controllers/post.controller");
// const { checkAuth } = require("../config/checkAuth.js");

module.exports = (Post) => {
  // all post and comm 
  Post.get("/api/post", postController.getAllPosts);
  Post.get("/api/comm", postController.getAllComm);

  // find comments by a post 
  Post.get('/api/post/:id/comm', postController.findCommentsByPost)
  

  //create 
  Post.post("/api/post/new",postController.createPosts)
  Post.post("/api/comm/new",postController.createComment)
  //retrive by id
  Post.get('/api/post/:id', postController.getPost)
  Post.get('/api/comm/:id', postController.getComment)
  // edit by id
  Post.put('/api/post/:id/edit', postController.updatePosts)
  Post.put('/api/post/:id/edit', postController.updateComment)
  //
  Post.delete('/api/post/:id/delete', postController.deletePosts)
  Post.delete('/api/comm/:id/delete', postController.deleteComment)


};