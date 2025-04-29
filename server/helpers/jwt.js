const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
function signToken(inObjUser) {
    try {
        const token = jwt.sign(inObjUser, JWT_KEY);
        return token
    } catch (error) {
        next(error)
    }
}
function verifyToken(inToken) {
    try {
        return jwt.verify(inToken, JWT_KEY);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signToken,
    verifyToken
}