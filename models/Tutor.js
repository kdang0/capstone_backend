import mongoose from 'mongoose';
import User from './User.js';
const tutorSchema = new mongoose.Schema({
    userId:{
        type: mongoose.ObjectId, 
        ref: User
    }

});

const Tutor = new mongoose.model('Tutor', tutorSchema);
export default Tutor;