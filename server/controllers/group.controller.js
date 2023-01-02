const { Group } = require('../model/group.model');
const { Category } = require('../model/category.model');


    // The method below is new
module.exports.createGroup = async (request, response) => {
    const { title,description,owner,category } = request.body;
   await Group.create({
        title,
        description,
        owner,
        category,
    })
        .then(group => response.json(group))
    .then(group => Category.findByIdAndUpdate({_id: category},{"group":group._id},{new:true}))
    .catch(err => response.status(400).json(err))
}
module.exports.createCategory = (request, response) => {
        const { title } = request.body;
        Category.create({
            title
        })
            .then(cat => response.json(cat))
        .catch(err => response.status(400).json(err))
    }



module.exports.getAllGroup = (request, response) => {
    Group.find({})
        .then(Post => response.json(Post))
        .catch(err => response.json(err))
}
module.exports.getAllCategories = (request, response) => {
    Category.find({})
        .then(cat => response.json(cat))
        .catch(err => response.json(err))
}


module.exports.findGroupByCategory = (request, response) => {
    Group.find({ category: request.params.id })
    .then((allgroupss) => res.json({ groupss: allgroupss }))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
}


module.exports.getGroup = (request, response) => {
    Group.findOne({_id:request.params.id})
        .then(Group => response.json(Group))
        .catch(err => response.json(err))
}
module.exports.getCategory = (request, response) => {
    Category.findOne({_id:request.params.id})
        .then(Group => response.json(Group))
        .catch(err => response.json(err))
}
module.exports.updateGroup = (request, response) => {
    Group.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedGroup => response.json(updatedGroup))
        .catch(err => response.json(err))
}

module.exports.updateCategory = (request, response) => {
    Category.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedGroup => response.json(updatedGroup))
        .catch(err => response.json(err))
}



module.exports.deleteGroup = (request, response) => {
    Group.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}


module.exports.deleteCategory = (request, response) => {
    Category.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}






