const jwt = require('jsonwebtoken');

const GenerateToken = (data, time) => {
    let token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
    return token;
}


const DecodeToken = (token) => {
    let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return data;
}


module.exports = {
    GenerateToken,
    DecodeToken
}