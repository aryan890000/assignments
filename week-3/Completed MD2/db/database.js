const mongoose = require("mongoose");
const url = "mongodb+srv://khandayharoon0811:khandayharoon0811@cluster.rnf5b.mongodb.net/CourseApplicationDataBase";

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

//Admin Schema 
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
});

//User Schema
const UserSchema = new mongoose.Schema({
    username : String,
    password :  String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course' 
    }]
});

//Course Schema
const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    ImageLink : String,
    price : Number
})



//Creating models
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}