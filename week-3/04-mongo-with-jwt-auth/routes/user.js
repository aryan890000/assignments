const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "100xDevs";

async function usernameTaken(uname) {
  const user = await User.findOne({ username: uname });
  return user ? true : false;
}

// User Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (usernameTaken(username)) {
    return res
      .status(404)
      .json({ msg: "User with the provided username already exists" });
  }

  await User.create({
    username: username,
    password: password,
  });

  res.status(200).json({ msg: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(username, JWT_SECRET);
    res.status(200).json({ token: token });
  } else {
    res.status(411).json({ msg: "Invalid credentials" });
  }
});

router.get("/courses", userMiddleware, (req, res) => {
  const courses = Course.find({});
  const publishedCourses = courses.filter((course, index) => {
    course.published ? true : false;
  });

  return res.status(200).json({ courses: publishedCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourses: courseId } }
  );

  res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const user = User.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.status(200).json({ purchasedCourses: courses });
});

module.exports = router;
