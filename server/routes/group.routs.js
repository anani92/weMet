const GroupController = require("../controllers/group.controller");
// const { checkAuth } = require("../config/checkAuth.js");

module.exports = (group) => {
  //get all
  group.get("/api/group", GroupController.getAllGroup);// not for use just emergancy
  group.get("/api/cat", GroupController.getAllCategories);

  //create
  group.post("/api/cat/new",GroupController.createCategory)
  group.post("/api/group/new",GroupController.createGroup)
  //get by id
  group.get('/api/cat/:id', GroupController.getCategory)
  group.get('/api/group/:id', GroupController.getGroup)


  // get all groups by spacific category
  group.get('/api/cat/:id/group', GroupController.findGroupByCategory)

  //update 
  group.put('/api/group/:id/edit', GroupController.updateGroup)
  group.put('/api/cat/:id/edit', GroupController.updateCategory)


  //delete
  group.delete('/api/group/:id/delete', GroupController.deleteGroup)
  group.delete('/api/cat/:id/delete', GroupController.deleteCategory)

};