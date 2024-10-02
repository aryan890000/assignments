const { Admin } = require('../db/index')

async function adminCheckPassword(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    const admin = await Admin.findOne({username, password})
    if(!admin) {
        res.status(403).json({msg: 'Forbidden'})
        return
    }

    next()
}

module.exports = adminCheckPassword