const jwt = require("jsonwebtoken");
const JWT_SECRET = "100xDevs";

function userMiddleware(req, res, next) {
  const auth_header = req.headers.authorization;
  const token = auth_header.split(" ")[1];
    
  try {
    const user = jwt.verify(token, JWT_SECRET);
    if (user.username) {
      req.username = user.username;
      req.auth_random = "random_data:)";
      next();
    }
  } catch (e) {
    res.status(403).json({
      msg: "Not authenticated"
    });
  }
}

module.exports = userMiddleware;
