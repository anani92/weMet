const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
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

    { timestamps: true }
    
);
// hashing password before saving to db
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});
const User = mongoose.model("User", userSchema);
module.exports = User;
