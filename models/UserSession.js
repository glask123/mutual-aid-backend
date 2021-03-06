const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
var UserSessionSchema = new Schema({
  userId: Number,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
