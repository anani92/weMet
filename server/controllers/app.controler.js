const Group = require("../model/group.models");
const User = require("../model/user.models");
// Groups APIs
const findAllgroups = (req, res) => {
  Group.find()
    .then((allgroupss) => res.json({ groupss: allgroupss }))
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

// User APIs
const createUser = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  User.create({
    username,
    email,
    password,
    confirmPassword,
  })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  // Group APIs
  findAllgroups,
  findGroupByCategory,
  findGroup,
  deleteGroup,
  updateGroup,
  newGroup,
  // User APIs
  createUser,
};
