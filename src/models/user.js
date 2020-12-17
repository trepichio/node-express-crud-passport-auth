const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));
