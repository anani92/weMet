const { Posts } = require('../model/posts.model');
const { Comments } = require('../model/comments.model');


    // The method below is new
module.exports.createPosts =  async(request, response) => {
    const { title, user,group } = request.body;
    await Posts.create({
        title,
        user,
        group,
        
    })
        .then(post => response.json(post))
    .catch(err => response.status(400).json(err))
}
module.exports.createComment = async(request, response) => {
        const { title, user,post } = request.body;
        await Comments.create({
            title,
            user,
            post
        })
            .then(comm => response.json(comm))
        .catch(err => response.status(400).json(err))
    }

module.exports.getAllPosts = (request, response) => {
    Posts.find({})
        .then(Post => response.json(Post))
        .catch(err => response.json(err))
}

module.exports.getPost = (request, response) => {
    Posts.findOne({_id:request.params.id})
        .then(Posts => response.json(Posts))
        .catch(err => response.json(err))
}

module.exports.updatePosts = (request, response) => {
    Posts.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPosts => response.json(updatedPosts))
        .catch(err => response.json(err))
}


module.exports.deletePosts = (request, response) => {
    Posts.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}





