import mongoose from 'mongoose';
import Class from './Class.js';
import Student from './Student.js';


export const submissionSchema = new mongoose.Schema({
    submittedDate: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [{
            questionId: {
                type: mongoose.ObjectId,
                required: true
            },
            answer: {
                type: String,
                required: true
            }
        }]
    },
    grade: {
        type: Number
    },
    feedback: {
        type: String
    },
    classId: {
        type: mongoose.ObjectId,
        ref: Class,
        required: true
    },
    assignmentId: {
        type: mongoose.ObjectId,
        required: true
    },
    studentId: {
        type:mongoose.ObjectId,
        required:true,
        ref:Student
    }
});

const Submission = new mongoose.model('Submission', submissionSchema);
export default Submission;