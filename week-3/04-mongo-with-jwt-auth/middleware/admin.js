const jwt = require('jsonwebtoken')

async function adminCheckToken(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]

    try {
        jwt.verify(token, "jwtPassword")
        next()
    } catch(e) {
        res.status(403).json({msg: 'Forbidden'})
    }
}

module.exports = adminCheckToken