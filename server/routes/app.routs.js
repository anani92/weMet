const appController = require('../controllers/app.controler')
module.exports = (app) => {
  app.get('/api/groups', appController.findAllgroups)
  app.get('/api/groups/:category', appController.findGroupByCategory)
  app.get('/api/roducts/:id', appController.findgroup)
  app.post('/api/groups/new', appController.newgroup)
  app.delete('/api/groups/:id/delete', appController.deleteProduct)
  app.put('/api/groups/:id/edit', appController.updateProduct)
}
