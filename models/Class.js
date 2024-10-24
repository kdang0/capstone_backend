import mongoose from 'mongoose';
import Tutor from './Tutor.js';

const classSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.ObjectId,
        ref: Tutor
    },
    name: {
        type: String,
        required:true
    }
});


const Class = new mongoose.model('Class', classSchema);
export default Class;