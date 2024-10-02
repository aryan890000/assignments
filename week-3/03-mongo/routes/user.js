const express = require('express')
const router = express.Router()
const { User, Course } = require('../db/index')
const userCheckPassword = require('../middleware/user')

router.use(express.json())

async function checkUserInDB(username) {
    const user = await User.findOne({username})
    if(user) {
        return true;
    }
    return false
}

async function saveUserInDB(username, password) {
    const user = new User({username, password})
    await user.save()
}

async function allCourses(){
    const courses = await Course.find()
    return courses
}

async function purchaseCourse(username, courseId) {
    const user = await User.findOne({username})
    user.purchasedCourses.push(courseId)
    await user.save()
}

async function allPurchasedCourses(username) {
    const purchasedCourses = await User.findOne({username}).populate({path: 'purchasedCourses'})
    return purchasedCourses.purchasedCourses
}

router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const isUserAlreadyPresent = await checkUserInDB(username)
    if(isUserAlreadyPresent) {
        res.status(409).json({message: 'username already exists'})
        return
    } else{
        try{
            saveUserInDB(username, password)
            res.status(200).json({message: 'User created successfully'})
        } catch(e) {
            res.status(500).json({message: 'Some error occurred'})
        }
    }
})

router.get('/courses', userCheckPassword, async (req, res) => {
    const courses = await allCourses()
    res.status(200).json({courses})
})

router.post('/courses/:courseId', userCheckPassword, async (req, res) => {
    const username = req.headers.username
    const courseId = req.params.courseId

    try {
        purchaseCourse(username, courseId)
        res.status(200).json({message: 'Course purchased successfully'})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

router.post('/purchasedCourses', userCheckPassword, async (req, res) => {
    const username = req.headers.username

    try {
        const purchasedCourses = await allPurchasedCourses(username)
        res.status(200).json({purchasedCourses})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

module.exports = router