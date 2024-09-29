import Admin from "../db/index";

async function validAdmin(uname, pwd) {
  const admin = await Admin.findOne({ username: uname, password: pwd });
  return admin ? true : false;
}

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const pwd = req.headers.password;

  if (!validAdmin(username, pwd)) {
    return res.status(404).json({ msg: "Action not allowed" });
  }

  next();
}

module.exports = adminMiddleware;
