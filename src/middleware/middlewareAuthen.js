const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')
const authenToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        // 'Beaer [token]'
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, data) => {
            if (err) res.sendStatus(403);
            await userModel.CheckAdmin(data.username);
            next();
        });
    } catch (error) {
        return res.status(500).send({ message: "Invalid Token" });
    }
}

module.exports = {
    authenToken:authenToken
}