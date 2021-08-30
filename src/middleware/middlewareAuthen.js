const jwt = require('jsonwebtoken');

const authenToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        // 'Beaer [token]'
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(403);
            next();
        });
    } catch (error) {
        return res.status(500).send({ message: "Invalid Token" });
    }
}

module.exports = {
    authenToken:authenToken
}