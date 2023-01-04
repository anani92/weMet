const Chat = require('../model/chat.model')
const User = require('../model/user.models')
const asyncHandler = require('express-async-handler')

// @desc		Access or initiate a chat between two persons
// @route		POST /api/chats
// @access		private
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    console.log('UserId param not sent with request')
    return res.sendStatus(400)
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.body.sender } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  })

  if (isChat.length > 0) {
    res.send(isChat[0])
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.body.sender, userId],
    }

    try {
      const createChat = await Chat.create(chatData)
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        'users',
        '-password'
      )
      res.status(200).send(fullChat)
    } catch (err) {
      res.status(400)
      throw new Error(err.message)
    }
  }
})

// @desc		Get all the chats for one user
// @route		GET /api/chats
// @access		private
const fetchChats = asyncHandler(async (req, res) => {
  console.log(req.user, 'iiii')
  try {
    var allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })

    allChats = await User.populate(allChats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    })

    res.status(200).send(allChats)
  } catch (err) {
    console.log(err)
    res.status(500)
    throw new Error('Server could not work on the request')
  }
})

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({
      message: 'Please add all the required fields',
    })
  }
  let users = JSON.parse(req.body.users)
  if (users.length < 2) {
    return res.status(400).send({
      message: 'A group must have more than 2 users',
    })
  }

  // add the current logged in user as well in the users array
  users.push(req.user)
  console.log(users)
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    res.status(200).json(fullGroupChat)
  } catch (err) {
    console.log(err)
    res.status(500)
    throw new Error('Server could not work on the request')
  }
})

// @desc		Rename the chat
// @route		PUT /api/chats/groupRename
// @access		Private
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body
  if (!chatName) {
    res.status(400).send({
      message: 'Please provide a valid group name',
    })
  }
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
    res.status(200).json(updatedChat)
  } catch (err) {
    res.status(500)
    throw new Error('Server could not work on the request')
  }
})

// @desc		add a new member to the group
// @route		PUT /api/chats/groupAdd
// @access		Private
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
    if (!updatedChat) {
      res.status(400)
      throw new Error('Invalid chat')
    } else {
      res.status(200).json(updatedChat)
    }
  } catch (error) {
    res.status(500)
    throw new Error('Server could not work on the request')
  }
})

// @desc		add a new member to the group
// @route		PUT /api/chats/groupAdd
// @access		Private
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
    if (!updatedChat) {
      res.status(400)
      throw new Error('Invalid chat')
    } else {
      res.status(200).json(updatedChat)
    }
  } catch (error) {
    res.status(500)
    throw new Error('Server could not work on the request')
  }
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
}
