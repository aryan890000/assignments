const { Router } = require("express");
const {Admin, User}=require("../db")
const adminMiddleware = require("../middleware/admin");
const JWT_SECRET=require("../config")
const router = Router();
const jwt=require("jsonwebtoken")


// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username:username,
        password:password
    })

    res.json({
        message:"Admin created successfully"
    })
});

//important in this assignment
router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    const user =await User.find({
        username,
        password
    })
    if(user){
        const token= await jwt.sign({
            username,
        },JWT_SECRET);
        res.json({
            token
        })
    }else{
        res.status(411),json({
            message:"incorrect email and pass"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const photoLink=req.body.photoLink;
    const price=req.body.price;

    const newCourse= await Course.create({
        title,
        description,
        photoLink,
        price
    })

    res.json({
        message:"Course created successfully",
        courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response=await Courses.find({});
    res.json({
        courses:response
    })
});

module.exports = router;