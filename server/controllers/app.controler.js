const Group = require('../model/group.model')
const User = require('../model/user.models')
const jwt = require('jsonwebtoken')



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
    // res.status(200).json({ provider: "weMet", token, user });
    res.status(200).json({ user, token })
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
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ msg: "user is logged successfully", user });
    // res.status(200).json({ provider: "weMet", token, user });
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ msg: 'Invalid credentials', error: error.message })
    // res.status(400).json(error);
  }
}

const allUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.json(allUsers))
    .catch((err) =>
      res.json({ message: 'something have gone wrong', error: err })
    )
}

// const logoutUser = (req, res) => {
//   req.clearCookie("access_token");
//   res.status(200).json("Logout sucessfull");
// };

module.exports = {

  // User APIs
  createUser,
  loginUser,
  allUsers,
  // logoutUser,
}
