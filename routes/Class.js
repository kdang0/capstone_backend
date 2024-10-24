import {Router} from 'express';
import Class from '../models/Class.js';
import ClassAccess from '../models/ClassAccess.js';

const classRouter = new Router();
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