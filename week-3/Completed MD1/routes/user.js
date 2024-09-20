const {Router} = require("express");
const {User , Course } = require("../DataBase/db")
const UserMiddleware = require("../middleware/User");
const router = Router();

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password =  req.body.password;

    User.create({
        username : username,
        password : password
    });
    res.status(200).json({
        Message : "user Created Successfully"
    });
});

router.get('/courses' ,async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId',UserMiddleware, async (req, res) => {
    // Implement course purchase logic

    const couserId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username : username
    },{
        "$push": {
            purchasedCourse: couserId
        }
    })
    res.json({
        message: "Purchase complete!",
        per : User.purchasedCourse
    })
});




router.get('/purchasedCourses',  async (req, res) => {
    // Implement fetching purchased courses logic

   
    const user = await User.findOne({
        username : req.headers.username
    })
    console.log(user.purchasedCourse);

    const course = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    })
    res.json({
        cor : course
    })
});


// console.log('Purchased Courses:', user.purchasedCourse);



// Export the router
module.exports = router;