const { Router } = require('express');
const { Admin,Course } = require('../DataBase/db');
const adminMiddleware = require('../middleware/Admin');
const router = Router();

// Admin routes 
router.post('/signup', async function(req, res) {
    const { username, password } = req.body;

    await Admin.create({ username, password });
    res.status(200).json({
        message: "Admin Created Successfully",
        admin: Admin
    });
});

// Implement course creation logic
router.post('/course', adminMiddleware, async function(req, res) {
    const { title, description, imageLink, price } = req.body;

    try {
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price
        });

        res.status(200).json({
            message: "Course Created Successfully",
            CourseID: newCourse._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating course", error: error.message });
    }
});

// Implement fetching all courses logic
router.get('/courses', adminMiddleware, async function(req, res) {
    try {
        const courses = await Course.find({});

        res.status(200).json({
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
});

// Export the router
module.exports = router;
