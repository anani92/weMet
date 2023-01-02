const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "group title is required"],
    },

    description: {
      type: String,
    },

    owner: {
      type: ObjectId,
      ref: "User",
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports.Group = mongoose.model("Group", groupSchema);
