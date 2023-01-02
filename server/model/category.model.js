const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
        title: {type:String,
            unique: true,
            required: [
                true,
                "Category title is required"
            ],
            minLength: [4, "Category me have to be at least 4 characters."],},
            
        group: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            }],

}, { timestamps: true });
module.exports.Category = mongoose.model('Category', CategorySchema);
