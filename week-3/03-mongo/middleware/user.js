import User from "../db/index";

async function validUser(uname, pwd) {
  const user = await User.findOne({ username: uname, password: pwd });
  return user ? true : false;
}

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const pwd = req.headers.password;

  if (!validUser(username, pwd)) {
    return res.status(404).json({ msg: "Invalid credentials" });
  }

  next();
}

module.exports = userMiddleware;
