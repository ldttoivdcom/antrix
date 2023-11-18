const jwt = require('jsonwebtoken');
exports.signToken = (id, email) => {
    return jwt.sign({
        userId: id,
        userEmail:email
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRED_IN})
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
