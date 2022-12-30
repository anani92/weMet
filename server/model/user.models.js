const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    // groups: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "group",
    //   },
    // ],
  },

    { timestamps: true }
    
);
const User = mongoose.model("User", userSchema);
module.exports = User;
