const mongoose                  = require("mongoose"),
      passportLocalMongoose     = require("passport-local-mongoose");



// USER MODEL
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose); // Add in some methods for User
module.exports = mongoose.model("User", UserSchema);
