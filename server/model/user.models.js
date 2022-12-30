const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    user: {
      username: { type: String },
      email: { type: String },
      password: { type: String },
      // groups: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "group",
      //   },
      // ],
    },
  },

  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
