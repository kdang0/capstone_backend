import mongoose from 'mongoose';


const userEnum = {
    values:  ['student', 'tutor'],
    message:  'enum validator failed for path `{PATH}` with value `{VALUE}`'
}

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    firstName: {
        type: String, 
        required:true
    },
    lastName: {
        type:String,
        required: true
    },
    role: {
        type: String, 
        enum: userEnum
    }
});

const User = new mongoose.model('User', userSchema);
export default User;