import mongoose from "mongoose";
import Student from './User.js';
import Class from './Class.js';

const classAccessSchema = new mongoose.Schema({
    classId : {
        type: mongoose.ObjectId,
        ref: Class,
        required: true
    },
    studentId : {
        type: mongoose.ObjectId,
        ref: Student,
        required: true      
    }
});

const ClassAccess = new mongoose.model('ClassAccess', classAccessSchema);
export default ClassAccess;