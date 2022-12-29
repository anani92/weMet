const mongoose = require('mongoose')
const groupSchema = new mongoose.Schema(
  {
    group: {
      name: { type: String },
      description: { type: String },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'post',
        },
      ],
    },
  },

  { timestamps: true }
)
const Group = mongoose.model('group', groupSchema)
module.exports = Group
