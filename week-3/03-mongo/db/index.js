const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:5MYznlEixSiDQoWi@cluster0.182kjcd.mongodb.net/Course-Selling-App');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String, 
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String, 
    password : String,
    purchasedCourse : [
        {
            title : String,
            description : String,
            price : String,
            imageLink : String,
        }
    ]


});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    price : String, 
    imageLink : String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}