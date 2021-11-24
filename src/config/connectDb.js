var bluebird = require("bluebird");
var mongoose = require('mongoose');
const connectDb = () => {
    try {
        mongoose.Promise = bluebird;
         let url = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.bxvyn.mongodb.net/${process.env.DATABASE_NAME}`;
         mongoose.connect(url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log("Connect database success username : ",process.env.USERNAME_DB);
    } catch (error) {
        console.log("Connect database error");
    }
    
}

module.exports = connectDb;