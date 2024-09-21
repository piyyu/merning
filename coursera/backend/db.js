const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const Admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const Courses = new Schema({
    name: String,
    description: String,
    price: Number,
    imaageUrl: String,
    courseId: ObjectId,
})

const purchase = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
})


const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admins", Admin);
const CourseModel = mongoose.model("courses", Courses);
const PurchaseModel = mongoose.model("purchases", purchase);

module.exports = {
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel: CourseModel,
    PurchaseModel: PurchaseModel,
}