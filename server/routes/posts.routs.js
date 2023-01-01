const postController = require("../controllers/post.controller");
// const { checkAuth } = require("../config/checkAuth.js");

module.exports = (Post) => {
  Post.get("/api/post", postController.getAllPosts);
  // app.get("/api/post/:group", postController.findGroupByCategory);
  Post.post("/api/post/new",postController.createPosts)
  Post.post("/api/comm/new",postController.createComment)

  Post.get('/api/post/:id', postController.getPost)
  // app.post('/api/groups/new', appController.newgroup)
  // app.delete('/api/groups/:id/delete', appController.deleteProduct)
  // app.put('/api/groups/:id/edit', appController.updateProduct)
  // TODO: User APIs
};