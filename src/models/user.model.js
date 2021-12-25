const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  avatar: String,
  status: { type: Boolean, default: false },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  createAt: { type: Number, default: Date.now() },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null },
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findByUsername(username) {
    return this.findOne({ username: username, status: false });
  },
  CheckAdmin(username) {
    return this.findOne({ username: username, status: true });
  },
  CheckLoginGoogle(uid) {
    return this.findOne({ "google.uid": uid, status: false });
  },
  CheckLoginFB(uid) {
    return this.findOne({ "facebook.uid": uid, status: false });
  },
};

module.exports = mongoose.model("users", UserSchema);
