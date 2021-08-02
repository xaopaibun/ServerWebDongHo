const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let NotificationSchema = new Schema({
    sender: {
        id: String,
        username: String,
        avatar: String
    },
    receiver: {
        id: String,
        username: String,
        avatar: String
    },
    text: String,
    type: String,
    content: String,
    isRead: { type: Boolean, default: false },
    createAt: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("notification", NotificationSchema);
