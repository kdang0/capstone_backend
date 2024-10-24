import mongoose from 'mongoose';

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
    }
});

const Submission = new mongoose.model('Submission', submissionSchema);
export default Submission;