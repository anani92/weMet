const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    // groups: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "group",
    //   },
    // ],
  },

  { timestamps: true }
);

// applying backend validation to unique attributes of user ( email , username)  with custom messages
userSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

// static register method
userSchema.statics.signup = async function (username, email, password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }
  
  return user; 
};

const User = mongoose.model("User", userSchema);
module.exports = User;
