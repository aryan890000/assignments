const { User } = require('../db/index')

async function userCheckPassword(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    const user = await User.findOne({username, password})
    if(!user) {
        res.status(403).json({msg: 'Forbidden'})
        return
    }

    next()
}

module.exports = userCheckPassword