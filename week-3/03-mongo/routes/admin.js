const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { SignUpSchema, CourseSchema } = require("../validators");
const { Admin, Course } = require("../db/index");
const bcryptjs = require("bcryptjs");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const validator = SignUpSchema.safeParse({ username, password });
  if (!validator.success) {
    return res.status(400).json(validator.error.flatten());
  }

  const userExists = await Admin.findOne({ username: username }).exec();
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new Admin({
    username: username,
    password: hashedPassword,
  });

  await user.save();

  return res.status(201).json({
    message: "Admin created successfully",
  });
});

router.post(
  "/courses",
  adminMiddleware,
  upload.single("file"),
  async (req, res) => {
    const { title, description, price } = req.body;

    const validator = CourseSchema.safeParse({
      title: title,
      description: description,
      price: parseFloat(price),
    });

    if (!validator.success) {
      return res.status(400).json(validator.error.flatten());
    }

    const url = req.protocol + "://" + req.get("host");
    const course = new Course({
      title: title,
      description: description,
      price: price,
      imageLink: url + "/uploads/" + req.file.filename,
    });
    await course.save();

    return res.status(201).json({
      message: "Course created successfully",
      courseId: course.id,
    });
  }
);

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find(
    {},
    { title: 1, description: 1, price: 1, imageLink: 1, _id: 1 }
  );
  res.json({ courses: courses });
});

module.exports = router;
