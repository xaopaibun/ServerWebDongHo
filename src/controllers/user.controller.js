const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const GenerateToken = (data, time) => {
    let token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
    return token;
}


const DecodeToken = (token) => {
    let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return data;
}

const loginAdmin = async(req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userModel.CheckAdmin(username);
        if (user) {
            if(await bcrypt.compare(password, user.password) === true){
                let accessToken = await GenerateToken({username : username}, '3600s');
                res.status(200).send({ message: 'Login Success',accessToken : accessToken  })
            }
            else{
                res.status(202).send({ message: 'Dang nhap that bai do sai tai khoan' });
            }
        }
        else {
            res.status(202).send({ message: 'Dang nhap that bai do sai tai khoan' });
        }
    } catch (error) {
        res.status(401).send({ message: 'Login Error' });
    }
}
// bcrypt.compare(password, hash, function(err, result) {
//     console.log(result)
// });

const signup = async(req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if(await userModel.findByUsername(username)){
            res.status(202).send({ message: 'Username ddax ton tai'});
        }else{
            const hashPassword =  await bcrypt.hash(password, saltRounds);
            await userModel.createNew({username : username,password:  hashPassword });
            res.status(200).send({ message: 'Signup Success' }); 
        }
    } catch (error) {
        res.status(401).send({ message: 'error' });
    }
}

module.exports = {
    loginAdmin : loginAdmin,
    signup : signup
}