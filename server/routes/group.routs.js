const GroupController = require("../controllers/group.controller");
// const { checkAuth } = require("../config/checkAuth.js");

module.exports = (Post) => {
  Post.get("/api/group", GroupController.getAllGroup);
  // app.get("/api/post/:group", postController.findGroupByCategory);
  Post.post("/api/cat/new",GroupController.createCategory)
  Post.post("/api/group/new",GroupController.createGroup)

  Post.get('/api/cat/:id', GroupController.getCategory)
  Post.get('/api/group/:id', GroupController.getGroup)

  // app.post('/api/groups/new', appController.newgroup)
  // app.delete('/api/groups/:id/delete', appController.deleteProduct)
  // app.put('/api/groups/:id/edit', appController.updateProduct)
  // TODO: User APIs
};