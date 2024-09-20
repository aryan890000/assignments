const mongoose = require('mongoose');

// Connect to the database
let url = "mongodb+srv://khandayharoon0811:khandayharoon0811@cluster.rnf5b.mongodb.net/CourseApplication";
mongoose.connect(url);

// Define the Schema for Admin
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Define the Schema for User
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

// Define the Schema for Course
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

// Create models
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
};
