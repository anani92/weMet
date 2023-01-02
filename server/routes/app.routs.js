const appController = require("../controllers/app.controler");
// const { requireAuth } = require("../middleware/requireAuth");

module.exports = (app) => {
  // TODO: Groups APIs
  app.get("/api/groups", appController.findAllgroups);
  app.get("/api/groups/:category", appController.findGroupByCategory);
  // app.get('/api/roducts/:id', appController.findgroup)
  // app.post('/api/groups/new', appController.newgroup)
  // app.delete('/api/groups/:id/delete', appController.deleteProduct)
  // app.put('/api/groups/:id/edit', appController.updateProduct)
  // TODO: User APIs
  app.post("/api/signup", appController.createUser);
  app.post("/api/login", appController.loginUser);
  app.get("/api/allUsers", appController.allUsers);
  // app.get("/api/logout", appController.logoutUser);

};
