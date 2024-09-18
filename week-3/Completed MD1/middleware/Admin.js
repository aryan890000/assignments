

const { Admin } = require('../DataBase/db');

function adminMiddleware(req, res, next) {
    const { username, password } = req.body;

    Admin.findOne({ username, password })
        .then(function(value) {
            if (value) {
                next();
            } else {
                res.status(403).json({ msg: "Admin Does Not Exist" });
            }
        });
}

module.exports = adminMiddleware;
