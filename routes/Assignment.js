import  { Router } from 'express';
import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import AssignAccess from '../models/AssignAccess.js';

const assignmentRouter = new Router();


assignmentRouter.post('/', async(req, res, next) => {
    try{
        const newAssignment  = await Assignment.create(req.body);
        if(newAssignment){
            res.status(201).json({assignment: newAssignment});
        } else{
            res.status(400).json({message: "Error creating new assignment"});
        }
    } catch(err){
        next(err);
    }
});

assignmentRouter.get('/', async(req,res,next) => {
    try{
        const assignments = await Assignment.find();
        if(assignments) {
            res.json({assignments});
        } else{
            res.json({message: "No projects found"});
        }
    } catch(err){
        next(error);
    }
});


assignmentRouter.get('/:id', async(req,res,next) => {
    try{
        const {id} = req.params;
        const assignment = await Assignment.findById(id);
        if(assignment){
            res.json({assignment});
        } else {
            res.json({message: `No assignment found with id: ${id}`});
        }
    } catch(err){
        next(error);
    }
});


assignmentRouter.patch('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const {body} = req;
        const assignment  = await Assignment.findByIdAndUpdate(id, body, {new:true});
        if(assignment) { 
            res.json({assignment});
        } else {
            res.json({message: `Error updating assignment: ${id}`});
        }
    } catch(error){
        next(error);
    }
});


assignmentRouter.patch('/submission/:id', async(req,res,next) => {
    try{
        const {id} = req.params;
        const {body} = req;
        const assignment = await Assignment.findById(id);
        if(!assignment){
            res.status(404).json({message: `Project not found: ${id}`});
        }
        const submission = await Submission.create(body);

        if(submission){
            assignment.submissions.push(submission);
            await assignment.save();
            res.status(201).json({assignment});
        } else{
            res.status(400).json({message: "Error creating submission"});
        }
    } catch(error){
        next(error);
    }
});

assignmentRouter.post('/access', async(req,res,next) => {
    try{
        const {body} = req;
        const newAccess = await AssignAccess.create(body);
        if(newAccess){
            res.status(201).json({access: newAccess});
        } else{
            res.status(400).json({message: "Error granting access"});
        }
    } catch(error){
        next(error);
    }
});

assignmentRouter.delete('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const deletedAssignment = await Assignment.findByIdAndDelete(id);
        if(deletedAssignment){
            res.json({
                message: `Assignment deleted: ${id}`,
                deletedAssignment
            });
        } else{
            res.json({message: `Error deleting assignment: ${id}`});
        }
    } catch(error){
        next(error);
    }
});


export default assignmentRouter;