const userModel = require('../models/user.model');
const md5 = require('md5')
const signup = async (req, res, next) => {
    try {
        let user = {
            local :{
                email: req.body.gmail, password: md5(req.body.password), confirmpassword: md5(req.body.confirmpassword)
            }
        }
        if(userModel.findByGmail(req.body.gmail)){
            res.send({message: 'Tai khoan da ton tai'})
        }
        else{
            await userModel.create(user)
            res.send({ message: 'Dang ky tai khoan thanh cong' });
        }
    } catch (error) {
        res.status(401).send({ message: 'error' });
    }
}

const login = (req, res, next) => {
    try {
        if(userModel.checkUser(req.body.gmail, md5(req.body.password))){
            res.send({message: 'Dang Nhap Thanh Cong'})
        }
        else{
            res.send({ message: 'Dang nhap that bai do sai tai khoan' });
        }
    } catch (error) {
        res.status(401).send({ message: 'error' });
    }
}

const loginFb = async (req, res, next) => {
    try {
        let userFB = req.body.FB;
        if(userModel.findByFacebookUid(userFB.userID)){
            console.log('da co uid')
        }
        else{
            let userFb = {
                username : userFB.name,
                avatar : userFB.picture.data.url,
                facebook: {
                    uid: userFB.userID,
                    token: userFB.accessToken,
                    email: userFB.email,
                },
                local :{
                    isActive: true
                }
            }
            await userModel.create(userFb)
            res.send({ message: 'Success', data : userFb});
        }
    } catch (error) {
        res.status(401).send({ message: 'error' });
    }
}

module.exports = {
    signup : signup,
    loginFb :loginFb,
    login : login
}