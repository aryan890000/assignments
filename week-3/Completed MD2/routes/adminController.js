const {Router} = require("express");
const {Admin , User , Course} = require("../db/database");
const JWT= require("jsonwebtoken");
const JWT_SECRET = require("../config");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = Router();
const z  = require("zod");

const signupSchema = z.object({
    username : z.string().email().endsWith("com"),
    password : z.string().min(8)
});



const signinSchema = z.object({
    username : z.string().email().endsWith("com"),
    password : z.string().min(8)
})

const courseSchema = z.object({
    title : z.string().min(1),
    description : z.string().min(1),
    ImageLink:z.string().url().optional(),
    price: z.number().positive()
})
// Signup controller
router.post('/signup', async function (req, res) {
    try {
        //vaildate 
        const result = signupSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({ message: result.error.errors[0].message });
        }
        const { username, password } = req.body;

        // Check if Admin already exists in the database
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({
                msg: "Admin already exists in our database"
            });
        }

        // Create the new Admin
        await Admin.create({
            username: username,
            password: password
        });

        res.status(201).json({
            msg: "Admin created successfully"
        });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});


router.post('/signin', async function ( req, res){
    // Implement admin signup logic
   try{
    const result = signinSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({ message: result.error.errors[0].message });
        }
    const {  username, password } = req.body;
    console.log(JWT_SECRET);

    // Find the admin by username
    const admin = await Admin.findOne({username,password});

    if (!admin) {
        return res.status(401).json({ message: "Incorrect username and password" });
    }

    if(admin){
        const token = JWT.sign({username},JWT_SECRET);
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: "Incorrect username and password" });
    }
   }catch (err) {
    console.error(err); // Log the actual error for debugging
    return res.status(500).json({ message: "Internal server error" });
} 
});

// Implement course creation logic
router.post('/courses', adminMiddleware, async function (req, res){
    try{
        const result = courseSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({ message: result.error.errors[0].message });
        }
        const {title,description,ImageLink, price} =  req.body;

    const newCousre = await Course.create({
        title,
        description,
        ImageLink,
        price
    });
    res.status(200).json({message:"course Created successfully" , couserID:newCousre._id});
    }catch(err){
        res.status(411).json({message:"something went wrong"})
    }
})

// Implement fetching all courses logic
router.get('/courses', adminMiddleware , async function( req, res){
    try{

        const response = await Course.find({})
        res.status(200).json({All_Courses: response});
    }catch(err){
        res.status(501).json({Message : "Cant find Any courses"});
    }
})
module.exports = router;