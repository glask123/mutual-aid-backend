const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
