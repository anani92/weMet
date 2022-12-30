const Groups = require("../model/group.models");

const findAllgroups = (req, res) => {
  Groups.find()
    .then((allgroupss) => res.json({ groupss: allgroupss }))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
};

const findGroupByCategory = (req, res) => {
  Groups.find({ category: req.pramas.category })
    .then((allgroupss) => res.json({ groupss: allgroupss }))
    .catch((err) =>
      res.json({ message: "something have gone wrong", error: err })
    );
};

const findGroup = (req, res) => {
  Groups.findOne({ _id: req.params.id })
    .then((groups) => res.json({ groups: groups }))
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};
const newGroup = (req, res) => {
  Groups.create(req.body)
    .then((newgroups) => {
      res.json({ groups: newgroups });
    })
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};

const deleteGroup = (req, res) => {
  Groups.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

const updateGroup = (req, res) => {
  let id = req.params.id;
  Groups.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedgroups) => res.json({ groups: updatedgroups }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports = {
  findAllgroups,
  findGroupByCategory,
  findGroup,
  deleteGroup,
  updateGroup,
  newGroup,
};
