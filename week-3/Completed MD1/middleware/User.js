const { User } = require("../DataBase/db");

async function UserMiddleware(req, res, next) {
    try {
        const { username, password } = req.headers;
        
        // Find user in the database
        const user = await User.findOne({ username, password });
        
        if (user) {
            // User exists, proceed to the next middleware or route handler
            next();
        } else {
            // User not found, respond with an error
            res.status(404).json({ msg: "User doesn't exist" });
        }
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ msg: "Server error", error });
    }
}

module.exports = UserMiddleware;
