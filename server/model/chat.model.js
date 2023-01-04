const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: [true, 'chatName is required field'],
      maxlength: 200,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { strictPopulate: false },

  {
    timestamps: true,
  }
)

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
