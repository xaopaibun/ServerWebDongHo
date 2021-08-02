const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ChatGroupSchema = new Schema({
    name: String,
    usersAmount: { type: Number, min: 3, max: 200 },
    messagesAmount: { type: Number, default: 0 },
    userId: String,
    members: [
        { userId: String }
    ],
    status: { type: Boolean, default: false },
    createAt: { type: Number, default: Date.now() },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
});

module.exports = mongoose.model("chat-group", ChatGroupSchema);
