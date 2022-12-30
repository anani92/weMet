const mongoose = require('mongoose');
const MassegesSchema = new mongoose.Schema({
            massege : {type:String,
            required: [
                true,
                "you cant send empty"
            ]},
            user:[
                {
                type:mongoose.Schema.Type.object,
                ref:'User'
            }],
            group:
                {
                type:mongoose.Schema.Type.object,
                ref:'Group'
            },
}, {timestamps: true });
module.exports.Masseges = mongoose.model('Masseges', MassegesSchema);
