const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  // role: {
  //   type: String,
  //   enum: ["user", "admin"],
  //   default: "user",
  // },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "Paswords are not same",
    },
  },
  tasks: [
    {
      name: String,
      description: String,
      completed: Boolean,
    },
  ],
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  // only run if password was modified
  if (!this.isModified("password")) return next();

  //hash the password, hashing algorithm: bcryptjs with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm field
  this.passwordConfirmation = undefined;
  next();
});

//instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //false mean not changed
  return false;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
