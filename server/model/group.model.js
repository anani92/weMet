const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const groupSchema = new mongoose.Schema({
        title: {type:String,
            unique: true,
            required: [
                true,
                "group title is required"
            ],
            minLength: [4, "Group have to be at least 4 characters."],},


            description: 
            { 
              type: String
            },

            owner: 
            {
              type: ObjectId,
              ref: "User",
            },
            category:{
              type: ObjectId,
              ref: "Category",
            },
          
        posts: [ {
            type: ObjectId,
            ref: "Posts",
            }],
          
          
   
         

}, { timestamps: true });
module.exports.Group = mongoose.model('Group', groupSchema);
