const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

userSchema.methods.toJSON =function ()  {
  const user = this.toObject();
  return {
    userName: user.userName,
    email: user.email,
  };
};
const User = mongoose.model("User", userSchema);

module.exports = User;
