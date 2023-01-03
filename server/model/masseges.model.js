const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const MassegesSchema = new mongoose.Schema(
  {
    massege: { type: String, required: [true, 'you cant send empty'] },
    user: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    group: {
      type: ObjectId,
      ref: 'Group',
    },
  },
  { timestamps: true }
)
module.exports.Masseges = mongoose.model('Masseges', MassegesSchema)
