const md5 = require('md5');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    gender: { type: String, default: 'male' },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: 'avatar' },
    role: { type: String, default: 'user' },
    local: {
        email: { type: String, trim: true },
        password: String,
        
        confirmpassword: String,
        isActive: { type: Boolean, default: false },
        verifyToken: String
    },
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
    createNew(item){
        return this.create(item);
    },
    findByEmail(email){
        return this.findOne({'local.email': email}).exec();
    },
    removeByID(id){
        return this.findByIdAndRemove(id).exec();
    },
    verify(token){
        return this.findOneAndUpdate(
            {"local.verifyToken":token},
            {"local.isActive": true, "local.verifyToken": null}
        )
    },
    findByFacebookUid(UId){
        return this.findOne({'facebook.uid': UId}).exec();
    },
    findByGmail(gmail){
        return this.findOne({'local.email': gmail}).exec();
    },
    checkUser(gmail, password){
        return this.findOne({'local.email': gmail,'local.password' : password}).exec();
    }

}



module.exports = mongoose.model("user", UserSchema);
