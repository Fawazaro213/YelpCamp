const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: '/default-profile.png'
}});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
