const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        postContent: {type:String,
            required: [
                true,
                "Content of the Post is required"
            ],
            minLength: [5, "question me have to be at least 5 characters."],},

        category:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                },
        comments:  [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                }],

}, { timestamps: true });
module.exports.Posts = mongoose.model('Posts', PostSchema);
