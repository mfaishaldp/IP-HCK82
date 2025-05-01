const bcryptjs = require('bcryptjs')
function signToken(inPassword) {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(inPassword, salt);
        return hash
    } catch (error) {
        throw error
    }
    
}
function verifyToken(inPassword, dbPassword) {
    try {
        return bcryptjs.compareSync(inPassword, dbPassword);
    } catch (error) {
        throw error
    }
}

module.exports = {
    signToken,
    verifyToken
}