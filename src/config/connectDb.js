var bluebird = require("bluebird");
var mongoose = require('mongoose');
const connectDb = () => {
    mongoose.Promise = bluebird;
    let url = 'mongodb+srv://Xaopaibun:vanquy@cluster0.bxvyn.mongodb.net/WebBanDongHo';
    return mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
}

module.exports = connectDb;