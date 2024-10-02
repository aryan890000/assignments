const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { Admin, Course } = require('../db/index.js')
const adminCheckToken = require('../middleware/admin')

router.use(express.json())

async function checkAdminInDB(username) {
    const admin = await Admin.findOne({username})
    if(admin) {
        return true
    }
    return false
}

async function saveAdminInDB(username, password) {
    const admin = new Admin({username, password})
    await admin.save()
}

async function addNewCourse(title, description, price, imageLink) {
    const newCourse = new Course({title, description, price, imageLink})
    await newCourse.save()
    return newCourse._id
}

async function allCourses() {
    const courses = await Course.find()
    return courses
}

router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const isAdminAlreadyPresent = await checkAdminInDB(username)
    if(isAdminAlreadyPresent) {
        res.status(409).json({message: 'username already exists'})
        return
    } else {
        try{
            await saveAdminInDB(username, password)
            res.status(200).json({message: 'Admin created successfully'})
        } catch(e) {
            res.status(500).json({message: 'Some error occurred'})
        }
    }
})

router.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await Admin.findOne({username, password})
    if(!user) {
        res.status(403).json({msg: 'Unauthorised'})
        return
    }

    try{
        const token = jwt.sign({username}, "jwtPassword")
        await Admin.updateOne({username, password}, {token})
        res.status(200).json({token})
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

router.post('/courses', adminCheckToken, async (req, res) => {
    try {
        const courseId = await addNewCourse(req.body.title, req.body.description, req.body.price, req.body.imageLink)
        res.status(200).json({
            message: 'Course created successfully',
            courseId
        })
    } catch(e) {
        res.status(500).json({message: 'Some error occurred'})
    }
})

router.get('/courses', adminCheckToken, async (req, res) => {
    const courses = await allCourses()
    res.status(200).json({courses})
})

module.exports = router