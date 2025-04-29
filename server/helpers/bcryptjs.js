const bcryptjs = require('bcryptjs')
function signToken(inPassword) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(inPassword, salt);
    return hash
}

module.exports = {signToken}