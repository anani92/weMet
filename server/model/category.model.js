const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
        categorytitle: {type:String,
            unique: true,
            required: [
                true,
                "Category is required"
            ],
            minLength: [5, "Category me have to be at least 5 characters."],},

            group:[
            {
            type:mongoose.Schema.Type.object,
            ref:'Group'
        }],

}, { timestamps: true });
module.exports.Category = mongoose.model('Category', CategorySchema);
