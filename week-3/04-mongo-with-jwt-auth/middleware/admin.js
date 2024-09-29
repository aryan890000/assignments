const jwt = require("jsonwebtoken");
const JWT_SECRET = "100xDevs";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const auth_header = req.headers.authorization;
  const token = auth_header.split(" ")[1];

  try {
    const admin = jwt.verify(token, JWT_SECRET);
    if (admin.username) next();
    else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = adminMiddleware;
