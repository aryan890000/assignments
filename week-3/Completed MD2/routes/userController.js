const {Router} = require("express");
const JWT= require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {Admin, User, Course} = require("../db/database")
const userMiddleware = require("../middleware/userMiddleware");
const router = Router();
const z = require("zod");

const signupSchema = z.object({
    username : z.string().email().endsWith("com"),
    password : z.string().min(8)
});

const signinSchema = z.object({
    username : z.string().email().endsWith("com"),
    password : z.string().min(8)
})

router.post('/signup', async function(req, res){
    try{

        const result = signupSchema.safeParser(req.body);
        if(!result.success){
            return res.status(400).json({message : result.error.errors[0].message})
        }

        const { username , password } = req.body;
    const existingUser = await User.findOne({username, password});
    if(existingUser){
        return res.status(409).json({message : "User Already exist in our database"});
    }

    await User.create({
        username : username,
        password : password
    });

    res.status(200).json({ message : "User created successfullt"});
    }catch(err){
        console.error("Error during signup:", err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

router.post('/signin', async function (req, res){
    try{

        const result = signinSchema.safeParser(req.body);
        if(!result.success){
            return res.status(400).json({message : result.error.errors[0].message});
        }


        const { username , password } = req.body;
        const user = await User.findOne({username,password});

    if(!user){
        return res.status(401).json({Message : "username and passwors is incorrect"});
    }
    if(user){
        const token = JWT.sign({username},JWT_SECRET);
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: "Incorrect username and password" });
    }
    }catch(err){
        console.error(err); // Log the actual error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courses', userMiddleware , async (req, res) => {
    try{
        const response = await Course.find({})
        res.status(200).json({All_Courses: response});
    }catch(err){
        res.status(501).json({Message : "Cant find Any courses"});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try{
        const result = signinSchema.safeParser(req.body);
        if(!result.success){
            return res.status(400).json({message : result.error.errors[0].message});
        }

        const courseID = req.params.courseId;
        const {username , password } = req.body
    
        await User.updateOne({
            username : username
        },{
           "$push":{
            purchasedCourses : courseID
           }
        });
        res.status(200).json({message : "Purchase complete"});
    }catch(err){
        res.status(403).json({message : "Somethin went Wrong"})
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    try{
        const result = signinSchema.safeParser(req.body);
        if(!result.success){
            return res.status(400).json({message : result.error.errors[0].message});
        }

        const { username , password } = req.body
        const user =  await User.findOne({username , password})
        console.log(user.purchasedCourses);
        const course = await Course.find({
            _id:{
                "$in" : user.purchasedCourses
            }
        });

        if(user.purchasedCourses.length <= 0){
            res.status(401).json({User_purchased : "NO course Purchased so far"})
        }
        res.status(200).json({User_purchased : course})
    }
    catch(error){
        res.status(401).json({User_purchased : "NO course Purchased so far"})
        }
});

module.exports = router;