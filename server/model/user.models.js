const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String },
      email: { type: String },
      password: { type: String },
      groups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'group',
        },
      ],
    },
  },

  { timestamps: true }
)
const user = mongoose.model('user', userSchema)
module.exports = Product
