const Group = require("../model/group.model");
const User = require("../model/user.models");
const jwt = require("jsonwebtoken");

// Groups APIs
const findAllgroups = (req, res) => {
  Group.find()
    .then((allgroups) => res.json(allgroups))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
};

const findGroupByCategory = (req, res) => {
  Group.find({ category: req.pramas.category })
    .then((allgroupss) => res.json({ groupss: allgroupss }))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
};

const findGroup = (req, res) => {
  Group.findOne({ _id: req.params.id })
    .then((groups) => res.json({ groups: groups }))
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};
const newGroup = (req, res) => {
  Group.create(req.body)
    .then((newgroups) => {
      res.json({ groups: newgroups });
    })
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};

const deleteGroup = (req, res) => {
  Group.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

const updateGroup = (req, res) => {
  let id = req.params.id;
  Group.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedgroups) => res.json({ groups: updatedgroups }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

// FIXME:User APIs
// token to be sent to frontend carrying user credentials (payload,header,secret) all encoded
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// create User
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({ msg: "User added successfully", email, token, user });
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ msg: "user is added successfully", email, user, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ msg: "user is logged successfully", user });
    res
      .status(200)
      .json({ msg: "User logged in successfully", email, token, user });
  } catch (error) {
    res.status(400).json({ msg: "Invalid credentials", error: error.message });
    // res.status(400).json(error);
  }
};

const allUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.json(allUsers))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
};

// const logoutUser = (req, res) => {
//   req.clearCookie("access_token");
//   res.status(200).json("Logout sucessfull");
// };

module.exports = {
  // Other APIs
  findAllgroups,
  findGroupByCategory,
  findGroup,
  deleteGroup,
  updateGroup,
  newGroup,
  // User APIs
  createUser,
  loginUser,
  allUsers,
  // logoutUser,
};
