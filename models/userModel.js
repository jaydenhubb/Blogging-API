const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    unique:true
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
) {
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough, try again!");
  }
  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("This Email has already been used");
  }
  const uname = await User.findOne({ firstName });
  if (uname) {
    throw Error("This name has already been used");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect Email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;

// userSchema.pre("save", async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(user.password, 10);

//   user.password = hash;
//   next();
// });
