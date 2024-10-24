import mongoose from 'mongoose';
import User from './User.js';
const studentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.ObjectId, 
        ref: User
    }

});

const Student = new mongoose.model('Student', studentSchema);
export default Student;