const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { User, Course } = require('../db/index.js')
const userCheckToken = require('../middleware/user')

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
            await saveUserInDB(username, password)
            res.status(200).json({message: 'User created successfully'})
        } catch(e) {
            res.status(500).json({message: 'Some error occurred'})
        }
    }
})

router.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({username, password})
    if(!user) {
        res.status(403).json({msg: 'Unauthorised'})
        return
    }

    try{
        const token = jwt.sign({username}, "jwtPassword")
        await User.updateOne({username}, {token})
        res.status(200).json({token})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

router.get('/courses', userCheckToken, async (req, res, next) => {
    try {
        const courses = await allCourses()
        res.status(200).json({courses})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred ' + e})
    }
})

router.post('/courses/:courseId', userCheckToken, async (req, res) => {
    const username = req.username
    const courseId = req.params.courseId

    try {
        const course = await Course.findById(courseId)
        if(!course) {
            res.status(404).json({msg: 'Such a course does not exist'})
            return
        }
    } catch(e) {
        res.status(404).json({msg: 'Please check the course id. Such a course does not exist.'})
        return
    }
    try {
        await purchaseCourse(username, courseId)
        res.status(200).json({message: 'Course purchased successfully'})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

router.post('/purchasedCourses', userCheckToken, async (req, res) => {
    const username = req.username

    try {
        const purchasedCourses = await allPurchasedCourses(username)
        res.status(200).json({purchasedCourses})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

module.exports = router