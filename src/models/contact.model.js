const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: { type: Boolean, default: false },
    createAt: { type: Number, default: Date.now() },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
});

ContactSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    updateNew(item){
        return this.updateAt(item)
    }
}
module.exports = mongoose.model("contact", ContactSchema);
