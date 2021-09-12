const md5 = require('md5');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    password : String,
    status : {type : Boolean, default: false},
    createAt: { type: Number, default: Date.now() },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
});


UserSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    findByUsername(username){
        return this.findOne({"username": username, "status": false });
    },
    CheckAdmin(id){
        return this.findOne({"_id": id, "status": true});
    },

}



module.exports = mongoose.model("users", UserSchema);