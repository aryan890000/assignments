const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({
        username: username,
    });

    if (userExists) {
        res.status(403).json({
            msg: "User with this username already exists."
        });
    } else {
        await User.create({
            username,
            password,
        });

        res.status(200).json({
            msg: "User created successfully."
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username,
    }, {
        "$push": {
           purchasedCourses: courseId
        }
    });
    res.json({
        msg: "Purchase Complete."
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username: username
    });
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.status(200).json({
        courses: courses,
        message: "Purchased courses data got successfully."
    })
});

module.exports = router