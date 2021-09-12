
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Util = require('../config/index')

const loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ success: false, message: 'Missing username or/and password' });
        }
        const user = await userModel.CheckAdmin(username);
        if (user) {
            if (await bcrypt.compare(password, user.password) === true) {
                let accessToken = await  Util.GenerateToken({_id : user._id}, '3600s');
                res.setHeader("AccessToken", accessToken)
                res.status(200).send({ success: true, message: 'Login Success' })
            }
            else {
                res.status(400).send({ success: false, message: 'Dang nhap that bai do sai tai khoan' });
            }
        }
        else {
            res.status(400).send({ success: false, message: 'Dang nhap that bai do sai tai khoan' });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: 'Login Error' });
    }
}
// bcrypt.compare(password, hash, function(err, result) {
//     console.log(result)
// });

const signup = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ success: false, message: 'Missing username or/and password' });
    }
    try {

        if (await userModel.findByUsername(username)) {
            res.status(400).send({ success: false,message: 'Username da ton tai' });
        } else {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await userModel.createNew({ username: username, password: hashPassword });
            res.status(400).send({success: true, message: 'Signup Success' });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: 'error' });
    }
}

module.exports = {
    loginAdmin,
    signup
}