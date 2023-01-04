const User = require('../model/user.models')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
// FIXME:User APIs
// token to be sent to frontend carrying user credentials (payload,header,secret) all encoded
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// create User
const createUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.signup(username, email, password)
    const token = createToken(user._id)
    req.user = user

    // res.status(200).json({ provider: "weMet", token, user });
    res.status(200).json(user)
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ msg: "user is added successfully", email, user, token });
  } catch (error) {
    res.status(400).json(error)
  }
}

// login User
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
      res.status(200).json({
        user: userExist,
        message: 'user successfully logged in',
      })
    } else {
      res.status(400)
      throw new Error('Invalid email or password')
    }
  } catch (err) {
    console.log(err)
    res.status(500)
    throw new Error(err)
  }
})

const allUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.json(allUsers))
    .catch((err) =>
      res.json({ message: 'something have gone wrong', error: err })
    )
}

module.exports = {
  // User APIs
  createUser,
  loginUser,
  allUsers,
  // logoutUser,
}
