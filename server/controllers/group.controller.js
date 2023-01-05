const { Group } = require('../models/group.model')
const { Posts } = require('../models/posts.model')

module.exports.createGroup = async (request, response) => {
  const { title, description, owner, category } = request.body
  await Group.create({
    title,
    description,
    owner,
    category,
  })
    .then((group) => response.json(group))
    .catch((err) => console.log(err))
}

module.exports.getAllGroup = (request, response) => {
  Group.find({})
    .sort({ createdAt: -1 })
    .then((Post) => response.json(Post))
    .catch((err) => response.json(err))
}

module.exports.findGroupByCategory = (request, response) => {
  Group.find({ category: request.params.cat })
    .then((allgroupss) => response.json({ allgroupss }))
    .catch((err) => console.log(err))
}

module.exports.findPostsByGroup = (request, response) => {
  Posts.find({ group: request.params.id })
    .sort({ createdAt: -1 })
    .then((post) => response.json({ post }))
    .catch((err) =>
      response.json({ message: 'something have gone wrong', error: err })
    )
}

module.exports.getGroup = (request, response) => {
  Group.findOne({ _id: request.params.id })
    .then((Group) => response.json(Group))
    .catch((err) => response.json(err))
}

module.exports.updateGroup = (request, response) => {
  Group.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedGroup) => response.json(updatedGroup))
    .catch((err) => response.json(err))
}

module.exports.deleteGroup = (request, response) => {
  Group.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err))
}
