const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');

// Connect to MongoDB
mongoose.connect('mongodb+srv://khandayharoon0811:khandayharoon0811@cluster.rnf5b.mongodb.net/courses');
//i hide the password for obi reasons


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String(),
    email:String(),
    password:String()
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String(),
    email:String(),
    password:String(),
    purchasedCourses: [{
        type:mongoose.Schema.Types.ObjectId,
        reference : `Courses`,
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
     title:String(),
     description : String(),
     imageLink: String,
     price :Number,

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}