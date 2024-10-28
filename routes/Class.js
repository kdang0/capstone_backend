import {Router} from 'express';
import Class from '../models/Class.js';
import ClassAccess from '../models/ClassAccess.js';
import Tutor from '../models/Tutor.js';

const classRouter = new Router();

//CREATE CLASS
classRouter.post('/', async (req,res,next) => {
    try{
        const newClass = await Class.create(req.body);
        if(newClass){
            res.status(201).json({class: newClass});
        } else{
            res.status(400).json({message: `Error creating new class`});
        }
    } catch(error){
        next(error);
    }
});

//GET SPECIFIC CLASS
classRouter.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const classSelection = await Class.findById(id);
        if(classSelection){
            res.json({classSelection});
        } else { 
            res.json({message: `No class found with ID : ${id}`});

        }
    } catch(error){
        next(error);
    }
});

//GET ALL CLASSES
classRouter.get('/', async (req,res,next) => {
    try{
        const classes = await Class.find();
        if(classes){
            res.json({classes});
        } else{
            res.json({message: "No classes found"});
        }
    } catch (error){
        next(error);
    }
});

//GET CLASS BY SPECIFIC STUDENT
classRouter.get('/student/:id', async (req,res,next) => {
    try{
        const {id}=req.params;
        const classes = [];
        const classAccessList = await ClassAccess.find({studentId: id});
        for(access of classAccessList){
            const classInst = await Class.findOne({_id: access.classId});
            classes.push(classInst);
        }
        res.json(classes);
    } catch(error){
        next(error);
    }
})


//GET CLASS BY SPECIFIC TUTOR
classRouter.get('/tutor/:id', async(req,res,next) => {
    try{
        const {id}=req.params;
        const tutor = await Tutor.findOne({userId: id});
        const classes = await Class.find({tutorId: tutor._id});
        res.json(classes);
    } catch(error){
        next(error);
    }
})

//DELETE SPECIFIC CLASS
classRouter.delete('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const deletedClass = await Class.findByIdAndDelete(id);
        if(deletedClass) {
            res.json({
                message: `Class deleted ${id}`,
                deletedClass
            });
        } else{
            res.json({message: `Error deleting class: ${id}`});
        }
    } catch(error){
        next(error);
    }
});

//GRANT ACCESS TO CLASS
classRouter.post('/access', async(req,res,next) => {
    try{
        const {body} = req;
        const newAccess = await ClassAccess.create(body);
        if(newAccess){
            res.status(201).json({access: newAccess});
        } else{
            res.status(400).json({message: "Error granting access"});
        }
    } catch(error){
        next(error);
    }
});

//UPDATE SPECIFIC CLASS
classRouter.patch('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const {body} = req;
        const classUpdate = await Class.findByIdAndUpdate(id, body, {new:true});
        if(classUpdate){
            res.json({classUpdate});
        } else{
            res.json({message: `Error updating class ${id}`});
        }
    } catch(error){
        next(error);
    }
});


export default classRouter;