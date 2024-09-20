const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,User} = require('../db')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;

    await Admin.create({
        username : username,
        email : email,
        password : password
    });
    res.status(200).json({
        message: 'Admin created successfully'
    });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;