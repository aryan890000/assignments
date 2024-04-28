const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} =require("../db")
const router = Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    //Check if user already exist or not
    try {
    const adminFind = await Admin.findOne({ username });
    if (!adminFind) {
      await Admin.create({ username, password });
      res.json({message: 'Admin created successfully'})
    }
    else{
      res.status(403).json({Error:'Admin already exists'})
    }    
    } catch (error) {
        res.status(404).json({ Error: "Error in Creating Admin",error });
    }
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    try {
    const { title, description, price, imageLink, published,id } = { ...req.body };
    await Course.create({id,title, description, price, imageLink, published})
     res.json({
       message: "Course created successfully",
       courseId: id,
     });
    } catch (error) {
        res.status(404).json({Error:"Error in creating Course",error})
    }
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    try {
      const allCourses = await Course.find()
      if(allCourses)
       res.json({ courses :allCourses});
      else
        res.status(404).json({Error:"Not get Any Courses"});
    } catch (error) {
      res.status(404).json({ Error: "Error to get Courses", error });
    }

});

module.exports = router;