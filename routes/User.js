import { Router } from 'express';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Tutor from '../models/Tutor.js'
const userRouter = new Router();


userRouter.post('/', async(req, res, next) => {
    try {
        console.log(req.body);
        const newUser = await User.create(req.body);
        if(newUser){
            if(newUser.role){
                if(newUser.role.toLowerCase() == "student"){
                    await Student.create({"userId": newUser._id});
                } else if(newUser.role.toLowerCase() == "tutor"){
                    await Tutor.create({"userId": newUser._id});
                }
            }
            res.status(201).json({user: newUser});
        } else{
            res.status(400).json({message: "Error creating new user"});
        }
    } catch(err) {
        next(err);
    }
});

userRouter.get('/:id', async(req,res,next) => {
    try{
        const user = await User.findById(req.params.id);
        if(user) {
            res.json({user});
        } else {
            res.json({message: `No user found with ID: ${req.params.id}`});
        }
    } catch(error){
        next(error);
    }
});

userRouter.patch('/:id', async(req, res, next) => {
    try{
        const {body} = req;
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,  body, {new:true});
        if(user) {
            res.json({user});
        } else{
            res.json({message: `Error updating user: ${id}`});
        }
    } catch(error){
        next(error);
    }
});

userRouter.delete('/:id', async(req,res,next) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(deletedUser) {
            res.json({
                message: `User deleted: ${id}`,
                deletedUser
            });
        } else{
            res.json({message: `Error deleting user: ${id}`})
        }
    } catch(error){
        next(error);
    }
});

export default userRouter;