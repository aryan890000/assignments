const jwt = require('jsonwebtoken')

async function userCheckToken(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]

    try {
        const decoded = jwt.verify(token, "jwtPassword")
        req.username = decoded.username
        next()
    } catch(e) {
        res.status(403).json({msg: 'Forbidden'})
    }
}

module.exports = userCheckToken