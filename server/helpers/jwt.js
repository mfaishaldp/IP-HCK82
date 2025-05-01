const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
function signToken(inObjUser) {
    try {
        const token = jwt.sign(inObjUser, JWT_KEY);
        return token
    } catch (error) {
        throw error
    }
}
function verifyToken(inToken) {
    try {
        return jwt.verify(inToken, JWT_KEY);
    } catch (error) {
        throw error
    }
}

module.exports = {
    signToken,
    verifyToken
}